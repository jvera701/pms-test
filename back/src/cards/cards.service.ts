import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card } from './cards.entity';
import { Project } from 'src/projects/projects.entity';
import { Status } from 'src/status/status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async getAllCardsFromProject(projectId: number, email: string) {
    const query = this.cardRepository
      .createQueryBuilder('Card')
      .select([
        'Card.id',
        'Card.title',
        'Card.description',
        'Status.id',
        'Status.name',
      ])
      .leftJoin('Card.status', 'Status')
      .innerJoin('Card.project', 'Project')
      .innerJoin('Project.user', 'User')
      .where('Project.id = :id', { id: projectId })
      .andWhere('User.email = :email', { email });

    return await query.getMany();
  }

  async addCardToProject(
    projectId: number,
    statusId: number | undefined,
    title: string,
    description: string,
    email: string,
  ) {
    const project = await this.projectRepository
      .createQueryBuilder('Project')
      .select(['Project.id', 'Project.name'])
      .innerJoin('Project.user', 'User')
      .where('Project.id = :id', { id: projectId })
      .andWhere('User.email = :email', { email })
      .getOne();

    if (!project) {
      throw new NotFoundException();
    }

    const status = statusId
      ? await this.statusRepository.findOne({
          where: { id: statusId },
        })
      : undefined;
    if (statusId && !status) {
      throw new NotFoundException();
    }

    const query = this.cardRepository
      .createQueryBuilder()
      .insert()
      .into(Card)
      .values({
        title: title,
        description: description,
        project: project,
        ...(status && { status: status }),
      });

    const ans = await query.execute();
    const newId = ans.identifiers[0].id;

    const query2 = this.cardRepository
      .createQueryBuilder('Card')
      .select([
        'Card.id',
        'Card.title',
        'Card.description',
        'Status.id',
        'Status.name',
      ])
      .leftJoin('Card.status', 'Status')
      .where('Card.id = :id', { id: newId });

    return await query2.getOne();
  }

  async updateCard(
    projectId: number,
    cardId: number,
    statusId: number | undefined,
    title: string | undefined,
    description: string | undefined,
    email: string,
  ) {
    const query = this.cardRepository
      .createQueryBuilder('Card')
      .select()
      .innerJoin('Card.project', 'Project')
      .innerJoin('Project.user', 'User')
      .where('Card.id = :id', { id: cardId })
      .andWhere('User.email = :email', { email: email })
      .andWhere('Project.id = :id', { id: projectId });

    const card = await query.execute();
    if (!card) {
      throw new NotFoundException();
    }
    const status = await this.statusRepository.findOne({
      where: { id: statusId },
    });

    await this.cardRepository
      .createQueryBuilder()
      .update(Card)
      .set({
        ...(title && { title: title }),
        ...(description && { description: description }),
        ...(status && { status: status }),
      })
      .where('Card.id = :id', { id: cardId })
      .execute();

    const query2 = this.cardRepository
      .createQueryBuilder('Card')
      .select([
        'Card.id',
        'Card.title',
        'Card.description',
        'Status.id',
        'Status.name',
      ])
      .innerJoin('Card.status', 'Status')
      .where('Card.id = :id', { id: cardId });

    return await query2.getOne();
  }
}

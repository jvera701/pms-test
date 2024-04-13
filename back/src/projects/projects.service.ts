import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { User } from 'src/users/user.entity';
import { Status } from 'src/status/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async getAllProjects(email: string): Promise<Project[]> {
    const query = this.projectRepository
      .createQueryBuilder()
      .select(['Project.name', 'Project.id'])
      .innerJoin('Project.user', 'User')
      .where('User.email = :email', { email });
    return await query.getMany();
  }

  async addProject(name: string, email: string): Promise<Project> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException();
    }
    const query = this.projectRepository
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values({
        name: name,
        user: user,
      });

    const ans = await query.execute();
    const newId = ans.identifiers[0].id;

    const query2 = this.projectRepository
      .createQueryBuilder('Project')
      .select()
      .where('Project.id = :id', { id: newId });

    return await query2.getOne();
  }

  async getAllStatusFromProject(projectId: number, email: string) {
    const query = this.statusRepository
      .createQueryBuilder('Status')
      .select(['Status.id', 'Status'])
      .innerJoin('Status.project', 'Project')
      .innerJoin('Project.user', 'User')
      .where('Project.id = :projectId', { projectId })
      .andWhere('User.email = :email', { email });

    return await query.getMany();
  }

  async addStatus(statusName: string, projectId: number, email: string) {
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

    const query = this.statusRepository
      .createQueryBuilder()
      .insert()
      .into(Status)
      .values({
        name: statusName,
        project: project,
      });

    const ans = await query.execute();
    const newId = ans.identifiers[0].id;
    const query2 = this.statusRepository
      .createQueryBuilder('Status')
      .select()
      .where('Status.id = :id', { id: newId });

    return await query2.getOne();
  }
}

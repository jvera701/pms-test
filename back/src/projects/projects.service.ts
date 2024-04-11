import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      throw new UnauthorizedException();
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
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from 'src/projects/projects.entity';
import { Status } from 'src/status/status.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Project, (project) => project.cards)
  project: Project;

  @ManyToOne(() => Status, (status) => status.cards)
  status: Status;
}

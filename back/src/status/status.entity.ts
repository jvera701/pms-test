import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Project } from '../projects/projects.entity';
import { Card } from 'src/cards/cards.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.statuses)
  project: Project;

  @OneToMany(() => Card, (card) => card.project, { nullable: true })
  cards: Card[];
}

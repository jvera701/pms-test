import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Card } from 'src/cards/cards.entity';
import { Status } from '../status/status.entity';
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Card, (card) => card.project)
  cards: Card[];

  @OneToMany(() => Status, (status) => status.project)
  statuses: Status[];
}

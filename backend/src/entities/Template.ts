import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Topic } from './Topic';

@Entity({ name: 'templates' })
export class Template {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string;

  @ManyToOne(() => Topic, (topic) => topic.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'topic_id' })
  topic!: Topic;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_public!: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_deleted!: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}

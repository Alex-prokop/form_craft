import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Template } from './Template';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Template, (template) => template.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'template_id' })
  template!: Template;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  question_type!: string;

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

  @Column({
    type: 'boolean',
    default: true,
  })
  show_in_results!: boolean;

  @Column({
    type: 'int',
    nullable: false,
  })
  question_order!: number;

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

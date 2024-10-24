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

// Перечисление для типов вопросов
export enum QuestionType {
  SINGLE_LINE_STRING = 'single_line_string',
  MULTI_LINE_TEXT = 'multi_line_text',
  POSITIVE_INTEGER = 'positive_integer',
  CHECKBOX = 'checkbox',
}

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Template, (template) => template.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'template_id' })
  template!: Template;

  @Column({
    type: 'enum',
    enum: QuestionType,
    nullable: false,
  })
  question_type!: QuestionType;

  @Column({ type: 'varchar', nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'boolean', default: true })
  show_in_results!: boolean;

  @Column({ type: 'int', nullable: false })
  question_order!: number;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}

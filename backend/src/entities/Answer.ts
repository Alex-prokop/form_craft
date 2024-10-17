import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Form } from './Form';
import { Question } from './Question';

@Entity({ name: 'answers' })
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Form, (form) => form.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'form_id' })
  form!: Form;

  @ManyToOne(() => Question, (question) => question.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question!: Question;

  @Column({
    type: 'text',
    nullable: false,
  })
  answer_value!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  answer_type!: string;

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

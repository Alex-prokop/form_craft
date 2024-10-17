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
import { Tag } from './Tag';

@Entity({ name: 'template_tags' })
export class TemplateTag {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Template, (template) => template.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'template_id' })
  template!: Template;

  @ManyToOne(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag!: Tag;

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

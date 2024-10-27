import { Topic } from '../types/topicTypes';

// Интерфейс Question для фронтенда
export interface Question {
  id: number;
  template_id: number;
  title: string;
  question_type: 'text' | 'textarea' | 'number' | 'checkbox';
  description: string;
  question_order: number;
  show_in_results: boolean;
  is_deleted: boolean;
  options?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Template {
  id: number;
  title: string;
  description: string;
  topicId: number;
  topic?: Topic;
}

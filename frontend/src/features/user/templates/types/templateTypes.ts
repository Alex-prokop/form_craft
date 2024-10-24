export interface Question {
  id: number;
  template_id: number;
  type: 'text' | 'textarea' | 'number' | 'checkbox';
  title: string;
  description: string;
  options?: string[];
  show_in_results: boolean; // Добавлено это поле
  is_deleted: boolean;
}

export interface Template {
  id: number;
  title: string;
  description: string;
  topic: string;
}

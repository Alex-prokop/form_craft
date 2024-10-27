import axios from 'axios';
import { API_URL } from '../../../../constants';
import { Question } from '../types/templateTypes';

// Получение заголовков авторизации
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Токен не найден');
  return { Authorization: `Bearer ${token}` };
};

// Обработка ошибок
const handleRequestError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error) && error.response) {
    console.error('Ошибка ответа:', error.response.data);
    throw new Error(error.response.data.message || defaultMessage);
  }
  console.error('Ошибка сети:', error);
  throw new Error('Ошибка сети');
};

// Преобразование типа вопроса (фронтенд <-> бэкенд)
const frontendToBackendType = (
  type: 'text' | 'textarea' | 'number' | 'checkbox'
): string => {
  switch (type) {
    case 'text':
      return 'single_line_string';
    case 'textarea':
      return 'multi_line_text';
    case 'number':
      return 'positive_integer';
    case 'checkbox':
      return 'checkbox';
    default:
      throw new Error(`Unsupported question type: ${type}`);
  }
};

const backendToFrontendType = (
  type: string
): 'text' | 'textarea' | 'number' | 'checkbox' => {
  switch (type) {
    case 'single_line_string':
      return 'text';
    case 'multi_line_text':
      return 'textarea';
    case 'positive_integer':
      return 'number';
    case 'checkbox':
      return 'checkbox';
    default:
      throw new Error(`Unsupported backend type: ${type}`);
  }
};

// Обобщенная функция для выполнения API-запросов
const apiRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown
): Promise<T | undefined> => {
  try {
    const headers = getAuthHeaders();
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    handleRequestError(
      error,
      `Ошибка при запросе ${method.toUpperCase()} ${url}`
    );
  }
};

// Получение всех вопросов по шаблону
export const fetchQuestionsByTemplate = async (
  templateId: number
): Promise<Question[]> => {
  const questions = await apiRequest<Question[]>(
    'get',
    `/api/templates/${templateId}/questions`
  );
  return (
    questions?.map((q) => ({
      ...q,
      question_type: backendToFrontendType(q.question_type),
    })) || []
  );
};

// Получение вопроса по ID
export const fetchQuestionById = async (
  questionId: number
): Promise<Question | undefined> => {
  const question = await apiRequest<Question>(
    'get',
    `/api/questions/${questionId}`
  );
  return question
    ? {
        ...question,
        question_type: backendToFrontendType(question.question_type),
      }
    : undefined;
};

// Создание нового вопроса
export const createQuestion = async (
  templateId: number,
  questionData: Omit<Question, 'id' | 'created_at' | 'updated_at'>
): Promise<Question | undefined> => {
  const backendData = {
    ...questionData,
    question_type: frontendToBackendType(questionData.question_type),
  };
  const newQuestion = await apiRequest<Question>(
    'post',
    `/api/templates/${templateId}/questions`,
    backendData
  );
  return newQuestion
    ? {
        ...newQuestion,
        question_type: backendToFrontendType(newQuestion.question_type),
      }
    : undefined;
};

// Обновление вопроса
export const updateQuestion = async (
  questionId: number,
  questionData: Partial<Omit<Question, 'id' | 'created_at' | 'updated_at'>>
): Promise<Question | undefined> => {
  const backendData = {
    ...questionData,
    question_type: questionData.question_type
      ? frontendToBackendType(questionData.question_type)
      : undefined,
  };
  const updatedQuestion = await apiRequest<Question>(
    'put',
    `/api/questions/${questionId}`,
    backendData
  );
  return updatedQuestion
    ? {
        ...updatedQuestion,
        question_type: backendToFrontendType(updatedQuestion.question_type),
      }
    : undefined;
};

// Удаление вопроса
export const deleteQuestion = async (questionId: number): Promise<void> => {
  await apiRequest<void>('delete', `/api/questions/${questionId}`);
};

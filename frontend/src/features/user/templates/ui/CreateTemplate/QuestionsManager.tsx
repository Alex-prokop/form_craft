import React from 'react';
import { Question } from '../../types/templateTypes';
import QuestionForm from '../CreateTemplate/QuestionForm/QuestionForm';

interface QuestionsManagerProps {
  templateTitle: string;
  questions: Question[];
  addNewQuestion: () => void;
  handleQuestionChange: (
    field: keyof Question,
    value: any,
    questionId: number
  ) => void;
  handleSaveQuestion: (question: Partial<Question>) => void;
  handleDeleteQuestion: (questionId: number) => void;
  onCancel: () => void;
  onEditQuestion: (questionId: number) => void; 
  editingQuestionId: number | null; 
}

const QuestionsManager: React.FC<QuestionsManagerProps> = ({
  templateTitle,
  questions,
  addNewQuestion,
  handleQuestionChange,
  handleSaveQuestion,
  handleDeleteQuestion,
  onCancel,
}) => {
  const handleSaveOrCreateQuestion = async (question: Question) => {
    try {
      if (!question.id || question.id < 0) {
        const { id, ...newQuestionData } = question;
        await handleSaveQuestion(newQuestionData); 
        console.log('Вопрос успешно создан');
      } else {
        await handleSaveQuestion(question);
        console.log('Вопрос успешно обновлен');
      }
    } catch (error) {
      console.error('Ошибка при сохранении вопроса:', error);
    }
  };

  return (
    <div className="mt-3">
      <h6>Управление вопросами для "{templateTitle}"</h6>
      {questions.length === 0 ? (
        <p>Вопросов пока нет</p>
      ) : (
        questions.map((question) => (
          <QuestionForm
            key={question.id || `temp-${Math.random()}`}
            question={question}
            handleQuestionChange={(field, value) => {
              handleQuestionChange(field, value, question.id);
            }}
            handleDeleteQuestion={() => handleDeleteQuestion(question.id)}
            handleSaveQuestion={handleSaveOrCreateQuestion}
          />
        ))
      )}

      <div className="mt-3">
        <button className="btn btn-secondary me-2" onClick={addNewQuestion}>
          Добавить новый вопрос
        </button>
        <button className="btn btn-link" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default QuestionsManager;

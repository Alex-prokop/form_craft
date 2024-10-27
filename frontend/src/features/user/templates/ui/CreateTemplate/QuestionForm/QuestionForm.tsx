import React from 'react';
import { Question } from '../../../types/templateTypes';
import QuestionTypeSelect from './QuestionTypeSelect';
import QuestionTitleInput from './QuestionTitleInput';
import QuestionOptions from './QuestionOptions';
import QuestionPreview from './QuestionPreview';

interface QuestionFormProps {
  question: Question;
  handleQuestionChange: (field: keyof Question, value: any) => void;
  handleDeleteQuestion: () => void;
  handleSaveQuestion?: (question: Question) => void; // Необязательный пропс
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  handleQuestionChange,
  handleDeleteQuestion,
  handleSaveQuestion,
}) => {
  const handleTypeChange = (newType: Question['question_type']) => {
    handleQuestionChange('question_type', newType);
    if (newType !== 'checkbox') {
      handleQuestionChange('options', []); // Удаление опций для не-чекбоксов
    }
  };

  const handleOptionChange = (optionIndex: number, value: string) => {
    if (question.options) {
      const updatedOptions = [...question.options];
      updatedOptions[optionIndex] = value;
      handleQuestionChange('options', updatedOptions);
    }
  };

  const addOption = () => {
    const updatedOptions = question.options ? [...question.options, ''] : [''];
    handleQuestionChange('options', updatedOptions);
  };

  const removeOption = (optionIndex: number) => {
    if (question.options) {
      const updatedOptions = question.options.filter(
        (_, idx) => idx !== optionIndex
      );
      handleQuestionChange('options', updatedOptions);
    }
  };

  return (
    <div className="border p-3 mb-3 rounded">
      <QuestionTitleInput
        title={question.title}
        onTitleChange={(value) => handleQuestionChange('title', value)}
      />
      <QuestionTypeSelect
        selectedType={question.question_type}
        onTypeChange={handleTypeChange}
      />
      {question.question_type === 'checkbox' && (
        <QuestionOptions
          options={question.options || []}
          onOptionChange={handleOptionChange}
          onAddOption={addOption}
          onRemoveOption={removeOption}
        />
      )}
      <QuestionPreview type={question.question_type} />

      <div className="mt-3">
        {handleSaveQuestion && (
          <button
            className="btn btn-primary me-2"
            onClick={() => handleSaveQuestion(question)}>
            Сохранить вопрос
          </button>
        )}
        <button className="btn btn-danger" onClick={handleDeleteQuestion}>
          Удалить вопрос
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;

import React from 'react';
import { Question } from '../../../types/templateTypes';
import QuestionTypeSelect from './QuestionTypeSelect';
import QuestionTitleInput from './QuestionTitleInput';
import QuestionOptions from './QuestionOptions';
import QuestionPreview from './QuestionPreview';

interface QuestionFormProps {
  question: Question;
  index: number;
  handleQuestionChange: (
    index: number,
    field: keyof Question,
    value: any
  ) => void; // Изменено на keyof Question
  handleDeleteQuestion: (index: number) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  index,
  handleQuestionChange,
  handleDeleteQuestion,
}) => {
  const handleTypeChange = (newType: Question['type']) => {
    handleQuestionChange(index, 'type', newType);
    if (newType !== 'checkbox') {
      handleQuestionChange(index, 'options', []); // Удаление опций для не-чекбоксов
    }
  };

  const handleOptionChange = (optionIndex: number, value: string) => {
    if (question.options) {
      const updatedOptions = [...question.options];
      updatedOptions[optionIndex] = value;
      handleQuestionChange(index, 'options', updatedOptions);
    }
  };

  const addOption = () => {
    const updatedOptions = question.options ? [...question.options, ''] : [''];
    handleQuestionChange(index, 'options', updatedOptions);
  };

  const removeOption = (optionIndex: number) => {
    if (question.options) {
      const updatedOptions = question.options.filter(
        (_, idx) => idx !== optionIndex
      );
      handleQuestionChange(index, 'options', updatedOptions);
    }
  };

  return (
    <div className="border p-3 mb-3 rounded">
      <QuestionTitleInput
        title={question.title}
        onTitleChange={(value) => handleQuestionChange(index, 'title', value)}
      />
      <QuestionTypeSelect
        selectedType={question.type}
        onTypeChange={handleTypeChange}
      />
      {question.type === 'checkbox' && (
        <QuestionOptions
          options={question.options || []}
          onOptionChange={handleOptionChange}
          onAddOption={addOption}
          onRemoveOption={removeOption}
        />
      )}
      <QuestionPreview type={question.type} />
      <button
        className="btn btn-danger mt-3"
        onClick={() => handleDeleteQuestion(index)}>
        Удалить вопрос
      </button>
    </div>
  );
};

export default QuestionForm;

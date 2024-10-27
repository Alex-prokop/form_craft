import React from 'react';
import { Question } from '../../../types/templateTypes';

interface QuestionTypeSelectProps {
  selectedType: Question['question_type'];
  onTypeChange: (newType: Question['question_type']) => void;
}

const QuestionTypeSelect: React.FC<QuestionTypeSelectProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <select
      value={selectedType}
      onChange={(e) =>
        onTypeChange(e.target.value as Question['question_type'])
      }
      className="form-control">
      <option value="text">Текст</option>
      <option value="textarea">Многострочный текст</option>
      <option value="number">Число</option>
      <option value="checkbox">Флажок</option>
    </select>
  );
};

export default QuestionTypeSelect;

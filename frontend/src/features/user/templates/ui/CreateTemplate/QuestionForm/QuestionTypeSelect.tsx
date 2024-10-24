import React from 'react';
import { Question } from '../../../types/templateTypes';

interface QuestionTypeSelectProps {
  selectedType: Question['type'];
  onTypeChange: (newType: Question['type']) => void; // Обновлено
}

const QuestionTypeSelect: React.FC<QuestionTypeSelectProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value as Question['type'])} // Приведение типа
      className="form-control">
      <option value="text">Текст</option>
      <option value="textarea">Многострочный текст</option>
      <option value="number">Число</option>
      <option value="checkbox">Флажок</option>
    </select>
  );
};

export default QuestionTypeSelect;

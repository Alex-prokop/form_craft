import React from 'react';

interface QuestionTitleInputProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

const QuestionTitleInput: React.FC<QuestionTitleInputProps> = ({
  title,
  onTitleChange,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">Вопрос</label>
      <input
        type="text"
        className="form-control"
        placeholder="Введите текст вопроса"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
    </div>
  );
};

export default QuestionTitleInput;

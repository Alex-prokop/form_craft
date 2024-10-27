import React from 'react';

interface QuestionPreviewProps {
  type: string;
}

const QuestionPreview: React.FC<QuestionPreviewProps> = ({ type }) => {
  if (type === 'text') {
    return (
      <div className="mb-3">
        <label className="form-label">Однострочный ответ</label>
        <input
          type="text"
          className="form-control"
          placeholder="Пользователь введет текст"
          disabled
        />
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="mb-3">
        <label className="form-label">Многострочный ответ</label>
        <textarea
          className="form-control"
          placeholder="Пользователь введет многострочный текст"
          rows={3}
          disabled
        />
      </div>
    );
  }

  if (type === 'number') {
    return (
      <div className="mb-3">
        <label className="form-label">Числовой ответ</label>
        <input
          type="number"
          className="form-control"
          placeholder="Пользователь введет число"
          disabled
        />
      </div>
    );
  }

  return null;
};

export default QuestionPreview;

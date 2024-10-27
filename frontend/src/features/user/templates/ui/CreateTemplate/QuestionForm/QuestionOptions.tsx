import React from 'react';

interface QuestionOptionsProps {
  options: string[];
  onOptionChange: (index: number, value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({
  options,
  onOptionChange,
  onAddOption,
  onRemoveOption,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">Варианты ответа</label>
      {options.map((option, idx) => (
        <div key={idx} className="d-flex mb-2">
          <input
            type="text"
            className="form-control"
            placeholder={`Вариант ${idx + 1}`}
            value={option}
            onChange={(e) => onOptionChange(idx, e.target.value)}
          />
          <button
            className="btn btn-danger ms-2"
            onClick={() => onRemoveOption(idx)}>
            Удалить
          </button>
        </div>
      ))}
      <button className="btn btn-primary mt-2" onClick={onAddOption}>
        Добавить вариант
      </button>
    </div>
  );
};

export default QuestionOptions;

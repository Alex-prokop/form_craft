import React from 'react';

interface SaveCancelButtonsProps {
  handleSubmit: () => void;
  handleCancel: () => void;
}

const SaveCancelButtons: React.FC<SaveCancelButtonsProps> = ({
  handleSubmit,
  handleCancel,
}) => (
  <div className="d-flex justify-content-between">
    <button className="btn btn-success" onClick={handleSubmit}>
      Сохранить
    </button>
    <button className="btn btn-secondary" onClick={handleCancel}>
      Отмена
    </button>
  </div>
);

export default SaveCancelButtons;

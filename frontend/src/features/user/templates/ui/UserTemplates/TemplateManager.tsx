import React, { useState } from 'react';
import TemplateCreationForm from '../CreateTemplate/TemplateCreationForm';
import TemplateList from '../TemplateList/TemplateList';

const TemplateManager: React.FC = () => {
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  return (
    <div>
      <h2>Мои формы</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setIsCreatingTemplate(true)}>
        Создать новую форму
      </button>

      {isCreatingTemplate ? (
        <TemplateCreationForm onClose={() => setIsCreatingTemplate(false)} />
      ) : (
        <TemplateList />
      )}
    </div>
  );
};

export default TemplateManager;

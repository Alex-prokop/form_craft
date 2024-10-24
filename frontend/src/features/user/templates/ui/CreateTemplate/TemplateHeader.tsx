import React from 'react';

interface TemplateHeaderProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  topic: string;
  setTopic: (topic: string) => void;
}

const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  title,
  description,
  setTitle,
  setDescription,
  topic,
  setTopic,
}) => (
  <div className="border p-3 rounded">
    <div className="mb-3">
      <label className="form-label">Название формы</label>
      <input
        type="text"
        className="form-control"
        placeholder="Введите название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Описание формы</label>
      <textarea
        className="form-control"
        placeholder="Введите описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Тема</label>
      <input
        type="text"
        className="form-control"
        placeholder="Введите тему"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
    </div>
  </div>
);

export default TemplateHeader;

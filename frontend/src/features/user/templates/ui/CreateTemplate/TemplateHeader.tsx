import React, { useEffect } from 'react';
import { useTopics } from '../../logic/useTopics';

interface TemplateHeaderProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  topicId: number | null;
  setTopicId: (topicId: number) => void;
}

const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  title,
  description,
  setTitle,
  setDescription,
  topicId,
  setTopicId,
}) => {
  const { topics, loading, error, loadTopics } = useTopics();

  // Загрузка тем при монтировании
  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  return (
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
        {loading ? (
          <div>Загрузка тем...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : (
          <select
            className="form-select"
            value={topicId ?? ''} // Устанавливаем текущее значение topicId
            onChange={(e) => setTopicId(Number(e.target.value))}>
            <option value="">Выберите тему</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.topic_name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default TemplateHeader;

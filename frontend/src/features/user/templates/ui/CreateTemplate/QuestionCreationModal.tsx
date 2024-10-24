import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Question } from '../../types/templateTypes';

interface QuestionCreationModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (newQuestion: Omit<Question, 'id'>) => void;
}

const QuestionCreationModal: React.FC<QuestionCreationModalProps> = ({
  show,
  onClose,
  onAdd,
}) => {
  const [type, setType] = useState<Question['type']>('text');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>([]);

  const handleAddQuestion = () => {
    const newQuestion: Omit<Question, 'id'> = {
      template_id: 0,
      type,
      title,
      description,
      options: type === 'checkbox' ? options : undefined,
      show_in_results: true,
      is_deleted: false,
    };
    onAdd(newQuestion);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить вопрос</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Тип вопроса</Form.Label>
          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value as Question['type'])}>
            <option value="text">Текст</option>
            <option value="textarea">Многострочный текст</option>
            <option value="number">Число</option>
            <option value="checkbox">Флажок</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Вопрос</Form.Label>
          <input
            type="text"
            className="form-control"
            placeholder="Введите вопрос"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        {type === 'textarea' && (
          <Form.Group className="mt-3">
            <Form.Label>Описание</Form.Label>
            <textarea
              className="form-control"
              placeholder="Введите описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        )}
        {type === 'checkbox' && (
          <div>
            <button
              className="btn btn-link"
              onClick={() => setOptions([...options, ''])}>
              Добавить вариант
            </button>
            {options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите вариант"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleAddQuestion}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionCreationModal;

import React, { useEffect, useState } from 'react';
import { useTemplates } from '../../logic/useTemplates';
import { useQuestions } from '../../logic/useQuestions';
import EditTemplate from '../EditTemplate/EditTemplate';
import TemplateItem from '../../ui/CreateTemplate/TemplateItem';
import QuestionsManager from '../../ui/CreateTemplate/QuestionsManager';
import { Question } from '../../types/templateTypes';

const TemplateList: React.FC = () => {
  const { userTemplates, loading, error, loadUserTemplates, removeTemplate } =
    useTemplates();
  const {
    questions,
    loadQuestions,
    setQuestions,
    addQuestion,
    editQuestion,
    removeQuestion,
  } = useQuestions();

  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(
    null
  );
  const [addingQuestionsToTemplateId, setAddingQuestionsToTemplateId] =
    useState<number | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadUserTemplates();
  }, [loadUserTemplates]);

  const filteredQuestions = questions.filter(
    (question) => question.template_id === addingQuestionsToTemplateId
  );

  const startAddingQuestions = (templateId: number) => {
    setAddingQuestionsToTemplateId(templateId);
    loadQuestions(templateId);
  };

  const startEditingQuestion = (questionId: number) => {
    setEditingQuestionId(questionId);
  };

  const cancelEditing = () => {
    setEditingQuestionId(null);
    setAddingQuestionsToTemplateId(null);
  };

  const handleEditTemplate = (templateId: number) => {
    setEditingTemplateId(templateId);
  };

  const handleDeleteTemplate = async (templateId: number) => {
    try {
      await removeTemplate(templateId);
      await loadUserTemplates();
    } catch (err) {
      console.error('Ошибка при удалении шаблона:', err);
    }
  };

  const handleSaveQuestion = async (question: Partial<Question>) => {
    try {
      const templateId = question.template_id;
      if (!templateId) {
        console.error('Отсутствует template_id');
        return;
      }

      if (!question.title) {
        console.error('Поле "title" является обязательным');
        return;
      }

      if (!question.id || question.id < 0) {
        const { id, ...newQuestionData } = question;
        await addQuestion(
          templateId,
          newQuestionData as Omit<Question, 'id' | 'created_at' | 'updated_at'>
        );
        console.log('Новый вопрос успешно создан на сервере');
      } else {
        await editQuestion(templateId, question as Question);
        console.log('Вопрос успешно обновлен на сервере');
      }

      await loadQuestions(templateId);
      cancelEditing();
    } catch (error) {
      console.error('Ошибка при сохранении вопроса на сервере:', error);
    }
  };

  const handleDeleteQuestion = async (questionId: number) => {
    try {
      await removeQuestion(questionId);
      console.log('Вопрос успешно удален');
      if (addingQuestionsToTemplateId) {
        await loadQuestions(addingQuestionsToTemplateId);
      }
    } catch (error) {
      console.error('Ошибка при удалении вопроса:', error);
    }
  };

  if (loading) return <p>Загрузка шаблонов...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="template-list">
      {editingTemplateId ? (
        <EditTemplate
          templateId={editingTemplateId}
          onClose={() => setEditingTemplateId(null)}
          onSave={loadUserTemplates}
        />
      ) : (
        <div className="list-group">
          {userTemplates.map((template) => (
            <div key={template.id}>
              <TemplateItem
                template={template}
                onEdit={handleEditTemplate}
                onDelete={handleDeleteTemplate}
                onAddQuestions={startAddingQuestions}
              />

              {addingQuestionsToTemplateId === template.id ? (
                <QuestionsManager
                  templateTitle={template.title}
                  questions={filteredQuestions}
                  addNewQuestion={() =>
                    setQuestions((prev) => [
                      ...prev,
                      {
                        id: -1 * (questions.length + 1), // Временный ID как отрицательный number
                        template_id: template.id,
                        question_type: 'text',
                        title: '',
                        description: '',
                        options: [],
                        show_in_results: true,
                        is_deleted: false,
                        question_order: questions.length + 1,
                      },
                    ])
                  }
                  handleQuestionChange={(field, value, questionId) => {
                    setQuestions((prevQuestions) =>
                      prevQuestions.map((question) =>
                        question.id === questionId
                          ? { ...question, [field]: value }
                          : question
                      )
                    );
                  }}
                  handleSaveQuestion={handleSaveQuestion}
                  handleDeleteQuestion={handleDeleteQuestion}
                  onCancel={cancelEditing}
                  onEditQuestion={startEditingQuestion}
                  editingQuestionId={editingQuestionId}
                />
              ) : (
                <div className="questions-overview">
                  <h6>Вопросы для "{template.title}"</h6>
                  {filteredQuestions.length === 0 ? (
                    <p>Вопросов пока нет</p>
                  ) : (
                    <ul>
                      {filteredQuestions.map((question) => (
                        <li key={question.id}>
                          {question.title || 'Без названия'}
                          <button
                            className="btn btn-link"
                            onClick={() => startEditingQuestion(question.id)}>
                            Редактировать
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteQuestion(question.id)}>
                            Удалить
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateList;

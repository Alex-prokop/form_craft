import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Question } from '../../types/templateTypes';
import QuestionForm from './QuestionForm/QuestionForm';

interface QuestionListProps {
  questions: Question[];
  handleQuestionChange: (
    index: number,
    field: keyof Question,
    value: any
  ) => void;
  handleDeleteQuestion: (index: number) => void;
  handleDragEnd: (result: any) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  handleQuestionChange,
  handleDeleteQuestion,
  handleDragEnd,
}) => (
  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="questions">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="mb-4">
          {questions.map((question, index) => (
            <Draggable
              key={question.id}
              draggableId={question.id.toString()}
              index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="mb-3">
                  <QuestionForm
                    question={question}
                    handleQuestionChange={(field, value) => {
                      handleQuestionChange(index, field, value);
                    }}
                    handleDeleteQuestion={() => handleDeleteQuestion(index)}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default QuestionList;

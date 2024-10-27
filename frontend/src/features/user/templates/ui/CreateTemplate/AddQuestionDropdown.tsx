// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { Question } from '../../types/templateTypes';

// interface AddQuestionDropdownProps {
//   onAdd: (newQuestion: Omit<Question, 'id'>) => void;
// }

// const AddQuestionDropdown: React.FC<AddQuestionDropdownProps> = ({ onAdd }) => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setShowModal(true)}>Добавить вопрос</Button>
//       <QuestionCreationModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onAdd={onAdd}
//       />
//     </>
//   );
// };

// export default AddQuestionDropdown;

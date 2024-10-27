// import { useState } from 'react';
// import { FormType } from '../../types/FormTypes';

// // Хук для управления формами пользователя
// export const useForms = () => {
//   const [userForms, setUserForms] = useState<FormType[]>([]);
//   const [isRequestPending, setIsRequestPending] = useState<boolean>(false); // Добавлено

//   // Создание новой формы
//   const createNewForm = async (): Promise<string | null> => {
//     setIsRequestPending(true); // Установка состояния в true при создании новой формы

//     const newForm: FormType = {
//       _id: `${Date.now()}`, // Генерация уникального идентификатора
//       formName: 'Untitled Form',
//       createdOn: new Date().toISOString(),
//       updatedOn: new Date().toISOString(),
//     };

//     setUserForms((prevForms) => {
//       const updatedForms = [...prevForms, newForm];
//       localStorage.setItem('forms', JSON.stringify(updatedForms));
//       return updatedForms;
//     });

//     setIsRequestPending(false); // Установка состояния в false после создания
//     return newForm._id;
//   };

//   // Удаление формы
//   const deleteForm = (formId: string) => {
//     setUserForms((prevForms) => {
//       const updatedForms = prevForms.filter((form) => form._id !== formId);
//       localStorage.setItem('forms', JSON.stringify(updatedForms));
//       return updatedForms;
//     });
//   };

//   // Загрузка форм из localStorage при монтировании
//   useState(() => {
//     const savedForms = JSON.parse(localStorage.getItem('forms') || '[]');
//     if (savedForms.length > 0) {
//       setUserForms(savedForms);
//     }
//   });

//   return {
//     userForms,
//     createNewForm,
//     deleteForm,
//     isRequestPending, // Возвращаемое состояние
//   };
// };

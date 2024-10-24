// import { FormType } from '../../types/FormTypes';

// // Функция для создания новой формы
// export const createFormApi = async () => {
//   const mockFormData = {
//     documentName: 'Untitled Form',
//     documentDescription: 'Add Description',
//     questions: [
//       {
//         question: 'Question',
//         questionType: 'radio',
//         answer: false,
//         points: 0,
//         options: [{ option: 'Option 1' }],
//         open: true,
//         required: false,
//       },
//     ],
//   };

//   // Вывод данных в консоль вместо отправки запроса
//   console.log('Mock API Call - Creating new form:', mockFormData);

//   // Эмулируем успешный ответ от сервера
//   return Promise.resolve({
//     documentId: 'mock-id-123',
//     ...mockFormData,
//   });
// };

// // Функция для получения форм пользователя
// export const getForms = async (): Promise<FormType[]> => {
//   const response = await fetch('/api/forms');
//   return await response.json();
// };

// // Функция для удаления формы
// export const deleteFormApi = async (formId: string): Promise<void> => {
//   await fetch(`/api/forms/${formId}`, { method: 'DELETE' });
// };

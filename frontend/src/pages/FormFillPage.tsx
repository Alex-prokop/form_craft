import React from 'react';
import { useForm } from 'react-hook-form';

interface FormFillInputs {
  answer: string;
}

const FormFillPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormFillInputs>();

  const onSubmit = (data: FormFillInputs) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Fill the Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="answer">Your Answer</label>
          <input
            id="answer"
            {...register('answer', { required: 'Answer is required' })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormFillPage;

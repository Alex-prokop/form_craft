import React from 'react';
import { useForm } from 'react-hook-form';

interface TemplateFormInputs {
  title: string;
  description: string;
  fields: string[];
}

const TemplateCreatePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TemplateFormInputs>();

  const addField = () => {
    const fields = getValues('fields') || [];
    setValue('fields', [...fields, '']);
  };

  const onSubmit = (data: TemplateFormInputs) => {
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create a New Template</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto"
        style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            {...register('description')}
          />
        </div>

        <div className="mb-3">
          <h3>Fields</h3>
          {(getValues('fields') || []).map((_, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={`field_${index}`} className="form-label">
                Field {index + 1}
              </label>
              <input
                id={`field_${index}`}
                className={`form-control ${
                  errors.fields?.[index] ? 'is-invalid' : ''
                }`}
                {...register(`fields.${index}`, {
                  required: 'Field is required',
                })}
              />
              {errors.fields?.[index] && (
                <div className="invalid-feedback">
                  {errors.fields[index]?.message}
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addField}>
            Add Field
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create Template
        </button>
      </form>
    </div>
  );
};

export default TemplateCreatePage;

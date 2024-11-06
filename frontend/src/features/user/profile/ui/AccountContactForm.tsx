import React, { useState } from 'react';
import { AccountContactData } from '../types/userProfileTypes';
import { createAccountAndContact } from '../logic/userProfileLogic';

interface AccountContactFormProps {
  username: string;
  email: string;
  onCancel: () => void;
}

const AccountContactForm: React.FC<AccountContactFormProps> = ({
  username,
  email,
  onCancel,
}) => {
  const [formData, setFormData] = useState<AccountContactData>({
    username,
    email,
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createAccountAndContact(formData);
    if (result === 'exists') {
      alert('Account and Contact already exist in Salesforce');
    } else if (result === 'created') {
      alert('Account and Contact successfully created in Salesforce');
      onCancel();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow-sm bg-light">
      <h4 className="mb-3 text-center">Create Account and Contact</h4>

      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          placeholder="Enter your name"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="form-control"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary mb-2">
          Create Account and Contact
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AccountContactForm;

// features/user/profile/ui/AccountContactForm.tsx
import React, { useState } from 'react';
import { createAccountAndContact } from '../api/userProfileAPI';
import { AccountContactData } from '../types/userProfileTypes';
import { validateAccountContactData } from '../logic/userProfileLogic';

const AccountContactForm: React.FC = () => {
  const [formData, setFormData] = useState<AccountContactData>({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAccountContactData(formData)) {
      await createAccountAndContact(formData);
      alert('Account и Contact успешно созданы!');
    } else {
      alert('Пожалуйста, заполните обязательные поля.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        value={formData.phone}
        onChange={handleChange}
      />
      <button type="submit">Создать Account и Contact</button>
    </form>
  );
};

export default AccountContactForm;

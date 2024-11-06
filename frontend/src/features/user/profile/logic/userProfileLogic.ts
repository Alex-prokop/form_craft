import { AccountContactData } from '../types/userProfileTypes';
import { createSalesforceAccount } from '../api/userProfileAPI';

export const validateAccountContactData = (
  data: AccountContactData
): boolean => {
  if (!data.username || !data.email) {
    alert('Username and email are required');
    return false;
  }
  return true;
};

export const createAccountAndContact = async (
  data: AccountContactData
): Promise<'created' | 'exists' | null> => {
  if (validateAccountContactData(data)) {
    try {
      const response = await createSalesforceAccount(data);
      return response.status === 201 ? 'created' : 'exists';
    } catch (error) {
      console.error('Error creating account and contact:', error);
      alert(`Error: ${(error as Error).message}`);
    }
  }
  return null;
};

import { useEffect, useState } from 'react';
import {
  fetchUsers,
  removeUser,
  blockUserById,
  unblockUserById,
  makeAdmin,
  revokeAdmin,
} from '../logic/usersLogic';
import { User } from '../types/userTypes';

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userList = await fetchUsers();
        setUsers(userList);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await removeUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleBlock = async (id: number) => {
    try {
      await blockUserById(id);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, is_blocked: true } : user
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUnblock = async (id: number) => {
    try {
      await unblockUserById(id);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, is_blocked: false } : user
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleAddAdmin = async (id: number) => {
    try {
      await makeAdmin(id);
      setUsers(
        users.map((user) =>
          user.id === id
            ? { ...user, role: { ...user.role, role_name: 'admin' } }
            : user
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRemoveAdmin = async (id: number) => {
    try {
      await revokeAdmin(id);
      setUsers(
        users.map((user) =>
          user.id === id
            ? { ...user, role: { ...user.role, role_name: 'user' } }
            : user
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Добавляем новую функцию для редактирования пользователя
  const handleEdit = (id: number) => {
    // Логика редактирования может быть реализована здесь (например, открытие модального окна)
    console.log(`Редактирование пользователя с ID: ${id}`);
  };

  return {
    users,
    loading,
    error,
    handleDelete,
    handleBlock,
    handleUnblock,
    handleAddAdmin,
    handleRemoveAdmin,
    handleEdit,
  };
};

import React, { useEffect, useState } from 'react';
import { fetchUsers, removeUser } from '../logic/usersLogic';
import { User } from '../types/userTypes';

const UserManagement = () => {
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

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>Управление пользователями</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;

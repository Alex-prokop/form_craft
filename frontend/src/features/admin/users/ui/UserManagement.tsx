import React from 'react';
import { useUserManagement } from '../logic/useUserManagement';
import UserTable from './UserTable';

const UserManagement = () => {
  const {
    users,
    loading,
    error,
    handleDelete,
    handleBlock,
    handleUnblock,
    handleAddAdmin,
    handleRemoveAdmin,
    handleEdit,
  } = useUserManagement();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <h1 className="my-4">Управление пользователями</h1>
      <UserTable
        users={users}
        onDelete={handleDelete}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onAddAdmin={handleAddAdmin}
        onRemoveAdmin={handleRemoveAdmin}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default UserManagement;

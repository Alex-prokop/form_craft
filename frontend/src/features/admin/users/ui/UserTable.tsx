import React from 'react';
import { User } from '../types/userTypes';
import UserRow from './UserRow';

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
  onUnblock: (id: number) => void;
  onAddAdmin: (id: number) => void;
  onRemoveAdmin: (id: number) => void;
  onEdit: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDelete,
  onBlock,
  onUnblock,
  onAddAdmin,
  onRemoveAdmin,
  onEdit,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Имя пользователя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Статус блокировки</th>
            <th>Статус удаления</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onDelete={onDelete}
              onBlock={onBlock}
              onUnblock={onUnblock}
              onAddAdmin={onAddAdmin}
              onRemoveAdmin={onRemoveAdmin}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

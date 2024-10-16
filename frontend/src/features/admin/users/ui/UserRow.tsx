import React from 'react';
import { User } from '../types/userTypes';

interface UserRowProps {
  user: User;
  onDelete: (id: number) => void;
  onBlock: (id: number) => void;
  onUnblock: (id: number) => void;
  onAddAdmin: (id: number) => void;
  onRemoveAdmin: (id: number) => void;
  onEdit: (id: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  onDelete,
  onBlock,
  onUnblock,
  onAddAdmin,
  onRemoveAdmin,
  onEdit,
}) => {
  return (
    <tr className="text-center">
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role?.role_name}</td>
      <td>{user.is_blocked ? 'Заблокирован' : 'Активен'}</td>
      <td>{user.is_deleted ? 'Удален' : 'Активен'}</td>
      <td>
        <button
          className="btn btn-sm btn-outline-primary me-1"
          onClick={() => onEdit(user.id)}
          title="Редактировать">
          <i className="bi bi-pencil"></i>
        </button>

        <button
          className="btn btn-sm btn-outline-danger me-1"
          onClick={() => onDelete(user.id)}
          title="Удалить">
          <i className="bi bi-trash"></i>
        </button>

        {user.is_blocked ? (
          <button
            className="btn btn-sm btn-outline-success me-1"
            onClick={() => onUnblock(user.id)}
            title="Разблокировать">
            <i className="bi bi-unlock"></i>
          </button>
        ) : (
          <button
            className="btn btn-sm btn-outline-warning me-1"
            onClick={() => onBlock(user.id)}
            title="Заблокировать">
            <i className="bi bi-lock"></i>
          </button>
        )}

        {user.role?.role_name === 'admin' ? (
          <button
            className="btn btn-sm btn-outline-secondary me-1"
            onClick={() => onRemoveAdmin(user.id)}
            title="Снять права администратора">
            <i className="bi bi-person-dash"></i>
          </button>
        ) : (
          <button
            className="btn btn-sm btn-outline-info me-1"
            onClick={() => onAddAdmin(user.id)}
            title="Назначить админом">
            <i className="bi bi-person-plus"></i>
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;

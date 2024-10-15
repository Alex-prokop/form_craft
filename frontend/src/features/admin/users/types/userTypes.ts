export interface User {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    role_name: string;
  };
  is_deleted: boolean;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
}

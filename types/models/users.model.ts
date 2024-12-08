export interface UsersModel {
  id: number;
  role: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  token?: string;
  created_at?: string;
}

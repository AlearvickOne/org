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

export const defaultUser: UsersModel = {
  id: -1,
  role: -1,
  name: '',
  surname: '',
  email: '',
  phone: '',
};

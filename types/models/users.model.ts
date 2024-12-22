export interface UsersModel {
  id: number;
  role: number;
  name: string;
  surname: string;
  nickname: string;
  email: string;
  token?: string;
  password?: string;
  created_at?: string;
}

export const defaultUser: UsersModel = {
  id: -1,
  role: -1,
  name: '',
  surname: '',
  nickname: '',
  email: '',
};

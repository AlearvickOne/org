export interface UsersModel {
  id: number;
  role: string;
  name: string;
  surname: string;
  nickname: string;
  email: string;
  token?: string;
  password?: string;
  is_archived?: boolean;
  created_at?: string;
}

export const defaultUser: UsersModel = {
  id: -1,
  role: '',
  name: '',
  surname: '',
  nickname: '',
  email: '',
};

import { UsersModel } from './users.model';

export interface BlogsModel {
  id: number;
  user_id: number;
  title: string;
  description: string;
  photo: string;
  content: string;
  created_at?: string;
  user?: UsersModel;
}

export const defaultBlogsModel: BlogsModel = {
  id: -1,
  user_id: 0,
  title: '',
  description: '',
  photo: '',
  content: '',
  created_at: '',
};

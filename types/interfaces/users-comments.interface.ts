export interface IUsersComments {
  userId: number;
  nickname: string;
  comment: string;
  otherUserComment?: IUsersCommentsNoId;
}

export interface IUsersCommentsNoId {
  nickname: string;
  comment: string;
}

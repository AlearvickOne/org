export interface IUsersComments {
  blogId: number;
  body: {
    userId: number;
    nickname: string;
    comment: string;
    otherUserComment?: IUsersCommentsNoId;
  };
}

export interface IUsersCommentsNoId {
  nickname: string;
  comment: string;
}

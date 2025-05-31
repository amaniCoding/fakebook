export type AddPostState = {
  isSuccessfull: boolean;
};

export type LikeActionState = {
  loading: boolean;
  isReacted: boolean;
};

export type LikeCount = {
  count: number;
};

export type User = {
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type Comment = {
  commentid: string;
  comment: string;
  date: string;
  user: User;
};

export type Comments = {
  commentid: string;
  comment: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type CommentStateAction = {
  loading: boolean;

  comment: Comment;
};

export type CommentData = {
  commentid: string;
  comment: string;
  date: string;
  user: {
    fname: string;
    lname: string;
    userid: string;
    profilepic: string;
  };
};

export type getCommentsStateAction = {
  loading: boolean;
  comments: CommentData[];
};

export type insertCommentStateAction = {
  loading: boolean;
  comment: CommentData;
};

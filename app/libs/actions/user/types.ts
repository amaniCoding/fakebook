export type AddPostState = {
  isSuccessfull: boolean;
};

export type LikeActionState = {
  loading: boolean;
  isLiked: boolean;
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
    profilePic: string;
  };
};

export type getCommentsStateAction = {
  loading: boolean;
  comments: CommentData[];
};

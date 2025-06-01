import { ReactionInfo } from "../../data/user/types";

export type AddPostState = {
  isSuccessfull: boolean;
};

export type LikeActionState = {
  loading: boolean;
  reactionInfo: ReactionInfo;
};

export type ReactionType = {
  reactiontype: string;
  fname: string;
  lname: string;
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

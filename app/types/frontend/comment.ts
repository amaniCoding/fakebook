import { User } from "./user";

export type Comment = {
  commentId: string;
  comment: string;
  date: string;
  user: User;
};

export type CommentInfo = {
  commentsCount: string;
  comments: {
    loading: boolean;
    comments: Comment[];
  };
};

import { User } from "./user";

export type Comment = {
  commentId: string;
  comment: string;
  date: string;
  user: User;
  media: {
    media: string;
    type: string;
  };
};

export type CommentInfo = {
  commentsCount: string;
  comments: {
    loading: boolean;
    comments: Comment[];
    page: number;
  };
};

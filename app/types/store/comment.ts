import { Comment } from "../frontend/comment";

export type CommentPayLoad = {
  postId: string;
  comment: Comment;
};

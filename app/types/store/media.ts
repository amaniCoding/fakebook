import { Comment } from "../frontend/comment";
import { ReactionInfo } from "../frontend/reaction";

export type MediaReactionInfoPayLoad = {
  postId: string;
  reactionInfo: ReactionInfo;
  mediaId: string;
};
export type MediaCommentPayload = {
  postId: string;
  comment: Comment;
  mediaId: string;
};

export type MediaCommentsPayload = {
  postId: string;
  comments: Comment[];
  mediaId: string;
};

export type MediaPagePayload = {
  page: number;
  postId: string;
  mediaId: string;
};

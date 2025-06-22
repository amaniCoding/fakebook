import { Comment } from "../frontend/comment";
import { ReactionInfo } from "../frontend/reaction";
import { User } from "../frontend/user";

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

export type MeidaLoadingPayload = {
  loading: true | false;
  mediaId: string | undefined;
};

export type MediaReactionLoadingPayLoad = {
  mediaId: string | undefined;
  reactionType: string;
  loading: boolean;
};

export type MediaReactionPagePayLoad = {
  mediaId: string | undefined;
  reactionType: string;
  page: number;
};
type UserReaction = {
  user: User;
  reactionType: string;
};

export type MediaReactionReactorsPayLoad = {
  mediaId: string | undefined;
  reactionType: string;
  reactors: UserReaction[];
};

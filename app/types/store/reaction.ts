import { ReactionInfo } from "../frontend/reaction";
import { User } from "../frontend/user";

export type ReactionInfoPayLoad = {
  postId: string;
  reactionInfo: ReactionInfo;
};

export type ReactionPagePayLoad = {
  postId: string;
  reactionType: string;
  page: number;
};

export type ReactionLoadingPayLoad = {
  postId: string;
  reactionType: string;
  loading: boolean;
};
type UserReaction = {
  user: User;
  reactionType: string;
};
export type ReactionReactorsPayLoad = {
  postId: string;
  reactionType: string;
  reactors: UserReaction[];
};

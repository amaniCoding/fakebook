import { User } from "./user";
import { FirstReactorInfo, ReactionGroup, ReactionInfo } from "./reaction";
import { Comment, CommentInfo } from "./comment";
export type Media = {
  type: string;
  mediaId: string;
  media: string;
};

export type GroupedReactionsInfo = {
  [reactionType: string]: {
    loading: boolean;
    page: number;
    rowCount: number | null;
    reactors: {
      user: User;
      reactionType: string;
    }[];
    reactionType: string;
  };
};

export type Post = {
  postId: string;
  post: string;
  date: string;
  medias: Media[];
  user: User;
  commentInfo: CommentInfo;
  reactionInfo: ReactionInfo;
  groupReactionInfo: GroupedReactionsInfo[];
};

export type APost = {
  postId: string;
  post: string;
  date: string;
  user: User;
  medias: {
    mediaId: string;
    type: string;
    media: string;
    reactionInfo: {
      isReacted: boolean;
      reactionType: string;
      firstReactorInfo: FirstReactorInfo;
      reactions: string;
      reactionGroup: ReactionGroup[];
    };
    groupReactionInfo: GroupedReactionsInfo[];
    commentInfo: {
      count: string;
      comments: {
        loading: boolean;
        comments: Comment[];
        page: number;
      };
    };
  }[];
  commentInfo: CommentInfo;
  reactionInfo: ReactionInfo;
  groupReactionInfo: GroupedReactionsInfo[];
};

import { User } from "./user";
import { FirstReactorInfo, ReactionGroup, ReactionInfo } from "./reaction";
import { Comment, CommentInfo } from "./comment";
export type Media = {
  type: string;
  mediaId: string;
  media: string;
};

export type Post = {
  postId: string;
  post: string;
  date: string;
  medias: Media[];
  user: User;
  commentInfo: CommentInfo;
  reactionInfo: ReactionInfo;
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
};

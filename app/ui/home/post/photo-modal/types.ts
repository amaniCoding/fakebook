import { Comment } from "@/app/types/frontend/comment";
import { APost } from "@/app/types/frontend/post";

export type MediaReactionGroup = {
  reactiontype: string;
  count: string;
};

export type User = {
  userId: string;
  fName: string;
  lName: string;
  profilePic: string;
};

export type ReactionInfo = {
  isReacted: boolean;
  reactionType: string;
  firstReactorInfo: FirstMediaReactor;
  reactions: string;
  reactionGroup: MediaReactionGroup[];
};

type FirstMediaReactor = {
  reactionId: string;
  reactionType: string;
  reactor: string;
};
export type CommentData = {
  commentId: string;
  comment: string;
  date: string;
  user: User;
};
export type Post = {
  postId: string;
  post: string;
  date: string;
  user: {
    userId: string;
    fname: string;
    lname: string;
    profilePic: string;
  };
  medias: {
    mediaid: string;
    type: string;
    media: string;
    reactionInfo: ReactionInfo;
    commentInfo: {
      count: string;
      comments: CommentData[];
    };
  }[];
};

export type PhotoModalProps = {
  post: APost | undefined;
  postId: string;
  mediaId: string;
};

export type insertCommentStateAction = {
  loading: boolean;
  comment: Comment;
};

export type getCommentsStateAction = {
  loading: boolean;
  comments: Comment[];
};

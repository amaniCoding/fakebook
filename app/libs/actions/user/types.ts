import { ReactionInfo } from "../../data/user/types";

export type Media = {
  type: string;
  mediaid: string;
  media: string;
};
export type User = {
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};
export type CommentInfo = {
  commentsCount: string;
  comments: CommentData[];
};

export type PostInfo = {
  postId: string;
  post: string;
  date: string;
  medias: Media[];
  user: User;
  commentInfo: CommentInfo;
  reactionInfo: ReactionInfo;
};

export type AddPostState = {
  isSuccessfull: boolean;
  postInfo: PostInfo[];
};

export type LikeActionState = {
  loading: boolean;
  reactionInfo: ReactionInfo;
};

export type PostReactionInfo = {
  reactionid: string;
  reactiontype: string;
  fname: string;
  lname: string;
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

export type MediaComments = {
  commentid: string;
  comment: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
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

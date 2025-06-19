import { Comment, CommentInfo } from "../frontend/comment";
import { Media } from "../frontend/post";
import { ReactionInfo } from "../frontend/reaction";
import { User } from "../frontend/user";

export type PostPayLoad = {
  postId: string;
  post: string;
  date: string;
  medias: Media[];
  user: User;
  commentInfo: CommentInfo;
  reactionInfo: ReactionInfo;
};

export type postOption = "textonly" | "textwithphoto" | "showphoto";

export type SubmittedPost = {
  postid: string;
  posttype: string;
  userid: string;
  post: string;
};

export type SubmittedPhoto = {
  postid: string;
  photo: string;
};

export type SubmittedPostType = {
  isSuccessfull: boolean;
  post: {
    post: SubmittedPost;
    photos: SubmittedPhoto[];
  };
};

export type InsertCommentAction = {
  postId: string;
  comments: Comment[];
};

export type PagePayload = {
  page: number;
  postId: string;
};

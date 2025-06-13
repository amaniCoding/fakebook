import { ReactionInfo } from "@/app/libs/data/user/types";

export type UpdateFeedActionPayload = {
  postId: string;
  reactionInfo: ReactionInfo | undefined;
};

export type LikeActionState = {
  loading: boolean;
  error: boolean;
  reactionInfo: ReactionInfo;
};

export type SubmittedPostType = {
  isSuccessfull: boolean;
  post: {
    post: SubmittedPost;
    photos: SubmittedPhoto[];
  };
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

import {
  MediaComments,
  MediaReactionGroup,
  ReactionInfo,
} from "@/app/libs/data/user/types";
export type postInfo = {
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
    reactionGroup: MediaReactionGroup[];
    mediaComments: string;
    reactionCount: string;
    firstReactor: string;
    loggedInUserReactionInfo: {
      isReacted: boolean;
      reactionType: string;
    };
    comments: MediaComments[];
  }[];
};
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

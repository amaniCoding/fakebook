import { MediaComments, ReactionInfo } from "@/app/libs/data/user/types";

type FirstMediaReactor = {
  reactionId: string;
  reactionType: string;
  reactor: string;
};
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
    reactionInfo: {
      isReacted: boolean;
      reactionType: string;
      firstReactorInfo: FirstMediaReactor;
      reactions: string;
      reactionGroup: MediaReactionGroup[];
    };
    commentInfo: {
      count: string;
      comments: MediaComments[];
    };
  }[];
};

export type MediaReactionGroup = {
  reactiontype: string;
  count: string;
};

export type FirstReactorInfo = {
  reactionId: string;
  reactionType: string;
  reactor: string;
};

export type ReactionPostInfo = {
  isReacted: boolean;
  reactionType: string;
  firstReactorInfo: FirstMediaReactor;
  reactions: string;
  reactionGroup: MediaReactionGroup[];
};
export type UpdateFeedActionPayload = {
  postId: string;
  reactionInfo: ReactionInfo | undefined;
};
export type UpdatePostInfoActionPayload = {
  postId: string;
  reactionInfo: ReactionPostInfo;
  mediaId: string;
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

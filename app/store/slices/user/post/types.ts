import { ReactionInfo } from "@/app/libs/data/user/types";

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
      comments: CommentData[];
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
  reactionInfo: ReactionInfo;
};

export type CommentInfo = {
  commentsCount: string;
  comments: CommentData[];
};
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

export type PostInfoPayLoad = {
  postId: string;
  post: string;
  date: string;
  medias: Media[];
  user: User;
  commentInfo: CommentInfo;
  reactionInfo: ReactionInfo;
};

export type CommentPayLoad = {
  postId: string;
  commentData: CommentData | undefined;
};
export type UpdatePostInfoActionPayload = {
  postId: string;
  reactionInfo: ReactionPostInfo;
  mediaId: string;
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

export type PostInfoCommentPayload = {
  postId: string;
  comment: CommentData;
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

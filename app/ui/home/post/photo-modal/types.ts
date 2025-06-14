export type MediaReactionGroup = {
  reactiontype: string;
  count: string;
};

type FirstMediaReactor = {
  reactionId: string;
  reactionType: string;
  reactor: string;
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
type postInfo = {
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

export type PhotoModalProps = {
  postInfo: postInfo | undefined;
  postId: string;
  mediaId: string;
};

import { MediaReactionGroup } from "@/app/libs/data/user/types";
export type MediaComments = {
  commentid: string;
  comment: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
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

export type PhotoModalProps = {
  postInfo: postInfo;
  postId: string;
  mediaId: string;
};

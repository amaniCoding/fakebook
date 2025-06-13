export type User = {
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};
export type Media = {
  type: string;
  mediaid: string;
  media: string;
};

export type PostDB = {
  postid: string;
  post: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type PostDBNew = {
  postid: string;
  post: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type MediaReactionGroup = {
  reactiontype: string;
  count: string;
};

export type MediaCommentsCount = {
  count: string;
};

export type MediaReactionCount = {
  count: string;
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

export type FirstMediaReactor = {
  reactionid: string;
  fname: string;
  lname: string;
  reactiontype: string;
};
export type ReactionGroup = {
  reactiontype: string;
  count: string;
};

export type Post = {
  postId: string;
  post: string;
  date: string;
};

type FirstReactorInfo = {
  reactionId: string;
  reactionType: string;
  reactor: string;
};

export type ReactionInfo = {
  isReacted: boolean;
  reactionType: string | undefined;
  firstReactorInfo: FirstReactorInfo;
  reactions: string;
  reactionGroup: ReactionGroup[];
};

export type Posts = {
  postId: string;
  post: string;
  date: string;
  medias: Media[];
  user: User;
  comments: string;
  reactionInfo: ReactionInfo;
};

export type Story = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type postOption = "textonly" | "textwithphoto" | "showphoto";

export type SimpleMedia = {
  media: string;
  type: string;
};
export type StoryMedia = {
  media: string;
  type: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type CurrentStoryPhotos = {
  loading: boolean;
  currentStoryPhotos: StoryMedia[];
};

export type Comment = {
  comments: string;
};

export type Like = {
  reactiontype: string;
  fname: string;
  lname: string;
};

export type Reaction = {
  reactions: string;
};

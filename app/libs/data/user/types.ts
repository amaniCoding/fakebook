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

export type ReactionGroup = {
  reactiontype: string;
  count: number;
};

export type Post = {
  postId: string;
  post: string;
  date: string;
};

export type ReactionInfo = {
  isReacted: boolean;
  reactionType: string | undefined;
  reactor: string | undefined;
  reactions: number;
  reactionGroup: ReactionGroup[];
};

export type Posts = {
  postId: string;
  post: string;
  date: string;
  medias: Media[];
  user: User;
  comments: number;
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
  comments: number;
};

export type Like = {
  reactiontype: string;
  fname: string;
  lname: string;
};

export type Reaction = {
  reactions: number;
};

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

export type Posts = {
  post: Post;
  medias: Media[];
  user: User;
  comments: number;
  reactions: number;
  reactionGroup: ReactionGroup[];
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

export type Reaction = {
  reactions: number;
};

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

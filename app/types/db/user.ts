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
export type Media = {
  type: string;
  mediaid: string;
  media: string;
};
export type Post = {
  postid: string;
  fname: string;
  lname: string;
  profilepic: string;
  post: string;
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

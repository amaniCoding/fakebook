export type Story = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type postOption = "textonly" | "textwithphoto";

export type StoryPhoto = {
  photo: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type CurrentStoryPhotos = {
  loading: boolean;
  currentStoryPhotos: StoryPhoto[];
};
export type Photo = {
  photo: string;
  photoid: string;
};
export type Post = {
  postid: string;
  fname: string;
  lname: string;
  profilepic: string;
  post: string;
};

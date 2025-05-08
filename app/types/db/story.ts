export type Story = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

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

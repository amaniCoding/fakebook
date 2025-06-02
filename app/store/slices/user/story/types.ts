export type StoryMedia = {
  media: string;
  type: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type Story = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type CurrentStoryPhotos = {
  loading: boolean;
  currentStoryPhotos: StoryMedia[];
};

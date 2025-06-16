export type HomeProps = {
  allStories: Story[];
  storyid: string;
  currentStory: Story[];
  currentStoryPhotos: StoryMedia[];
};

export type Story = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type StoryMedia = {
  media: string;
  type: string;
  fname: string;
  lname: string;
  profilepic: string;
};

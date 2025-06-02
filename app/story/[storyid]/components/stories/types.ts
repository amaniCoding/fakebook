export type Story = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type StoriesProps = {
  allStories: Story[];
  showStoryPhoto: (story: Story) => void;
};

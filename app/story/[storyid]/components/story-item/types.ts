export type Story = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type StoryItemProps = {
  story: Story;
  showStoryPhoto: (story: Story) => void;
};

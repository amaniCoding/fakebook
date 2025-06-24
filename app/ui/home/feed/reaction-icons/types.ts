export type ReactionIconsProps = {
  reactiontype: string;
  onClick: (activeReaction: string) => void;
  onHover: (index: number) => void;
  index: number;
  activeIndex: number;
  postId: string;
  activePostId: string;
};

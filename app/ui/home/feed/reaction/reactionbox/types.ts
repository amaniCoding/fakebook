import { ReactionGroup } from "@/app/types/frontend/reaction";

export type ReactionBoxTypes = {
  onClose: () => void;
  activeReactionType: string;
  groupedReactions: ReactionGroup[];
  postId: string;
};

export type ReactionIconsProps = {
  reactiontype: string;
  isActive: boolean;
  onClick: (reactionType: string) => void;
};

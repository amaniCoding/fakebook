import { ReactionGroup } from "@/app/types/frontend/reaction";

export type ReactionBoxTypes = {
  onClose: () => void;
  activeReactionType: string;
  groupedReactions: ReactionGroup[] | undefined;
  postId: string;
  mediaId: string | undefined;
};

export type ReactionIconsProps = {
  reactiontype: string;
  onClick: (reactionType: string) => void;
  onHover: (index: number) => void;
  isActive: boolean;
};

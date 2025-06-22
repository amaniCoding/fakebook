import { User } from "@/app/types/frontend/user";
type UserReaction = {
  user: User;
  reactionType: string;
};
export type ReactorItemProps = {
  reactor: UserReaction;
  ref: ((node: HTMLDivElement) => void) | null;
};

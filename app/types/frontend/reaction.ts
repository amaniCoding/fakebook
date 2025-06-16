export type FirstReactorInfo = {
  reactionId: string;
  reactionType: string;
  reactor: string;
};

export type ReactionGroup = {
  reactionType: string;
  count: string;
};

export type ReactionInfo = {
  isReacted: boolean;
  reactionType: string;
  firstReactorInfo: FirstReactorInfo;
  reactions: string;
  reactionGroup: ReactionGroup[];
};

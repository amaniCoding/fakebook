export type Media = {
  type: string;
  mediaid: string;
  media: string;
};

export type MComment = {
  commentid: string;
  comment: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type ReactionGroup = {
  reactiontype: string;
  count: string;
};

export type CommentsCount = {
  count: string;
};

export type ReactionCount = {
  count: string;
};

export type FirstReactor = {
  reactionid: string;
  fname: string;
  lname: string;
  reactiontype: string;
};

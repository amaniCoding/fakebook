export type Reaction = {
  reactions: string;
};

export type CommentsCount = {
  comments: string;
};

export type GroupReaction = {
  reactiontype: string;
  count: string;
};

export type ReactionInfo = {
  fname: string;
  lname: string;
  reactionid: string;
  reactiontype: string;
  reactor: string;
};

export type Comment = {
  commentid: string;
  comment: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

export type Post = {
  postid: string;
  post: string;
  date: string;
  userid: string;
  fname: string;
  lname: string;
  profilepic: string;
};

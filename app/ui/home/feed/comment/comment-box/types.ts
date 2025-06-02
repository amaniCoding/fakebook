import { Posts } from "@/app/libs/data/user/types";

export type CommentBoxProps = {
  post: Posts;
  onClose: () => void;
};

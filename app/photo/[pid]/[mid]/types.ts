import { APost } from "@/app/types/frontend/post";

export type CommentBoxProps = {
  post: APost;
  onClose: () => void;
};

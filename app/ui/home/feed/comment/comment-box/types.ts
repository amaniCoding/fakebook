import { Post } from "@/app/types/frontend/post";
import { Comment } from "@/app/types/frontend/comment";
export type getCommentsStateAction = {
  loading: boolean;
  comments: Comment[];
};

export type CommentBoxProps = {
  post: Post;
  onClose: () => void;
};

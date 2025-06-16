import { Post } from "../../frontend/post";

export type AddPostState = {
  isSuccessfull: boolean;
  post: Post | undefined;
};

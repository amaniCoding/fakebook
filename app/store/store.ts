import { configureStore } from "@reduxjs/toolkit";
import { userStorySlice } from "./slices/user/story/storySlice";
import { userPostSlice } from "./slices/user/post/postSlice";
import { userCommentSlice } from "./slices/user/comment/commentSlice";

// ...

export const store = configureStore({
  reducer: {
    userStory: userStorySlice.reducer,
    userPost: userPostSlice.reducer,
    userComment: userCommentSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

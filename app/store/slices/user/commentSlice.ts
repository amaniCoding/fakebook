import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface commentState {
  isCommentBoxShown: boolean;
}

// Define the initial state using that type
const initialState: commentState = {
  isCommentBoxShown: false,
};

export const userCommentSlice = createSlice({
  name: "usercomment",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showCommentBox: (state, action: PayloadAction<boolean>) => {
      state.isCommentBoxShown = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { showCommentBox } = userCommentSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userCommentSlice.reducer;

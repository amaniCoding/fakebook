import { postOption, SubmittedPostType } from "@/app/types/db/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface StoryState {
  isPostBoxShown: boolean;
  post: string;
  postOption: postOption;
  rows: number;
  marginTop: number;
  submittedPost: SubmittedPostType | undefined;
}

// Define the initial state using that type
const initialState: StoryState = {
  isPostBoxShown: false,
  post: "",
  postOption: "textonly",
  rows: 1,
  marginTop: 6,
  submittedPost: {
    isSuccessfull: false,
    post: {
      post: {
        post: "",
        postid: "",
        posttype: "",
        userid: "",
      },
      photos: [],
    },
  },
};

export const userPostSlice = createSlice({
  name: "userpost",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showPostBox: (state, action: PayloadAction<boolean>) => {
      state.isPostBoxShown = action.payload;
    },

    setPost: (state, action: PayloadAction<string>) => {
      state.post = action.payload;
    },

    setPostOption: (state, action: PayloadAction<postOption>) => {
      state.postOption = action.payload;
    },

    setRows: (state, action: PayloadAction<number>) => {
      state.rows = action.payload;
    },

    setMarginTop: (state, action: PayloadAction<number>) => {
      state.marginTop = action.payload;
    },
    setSubmittedPost: (
      state,
      action: PayloadAction<SubmittedPostType | undefined>
    ) => {
      state.submittedPost = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {
  showPostBox,
  setPost,
  setPostOption,
  setSubmittedPost,
  setRows,
  setMarginTop,
} = userPostSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userPostSlice.reducer;

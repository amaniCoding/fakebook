import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface StoryState {
  isPostBoxShown: boolean;
}

// Define the initial state using that type
const initialState: StoryState = {
  isPostBoxShown: false,
};

export const userPostSlice = createSlice({
  name: "userpost",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showPostBox: (state, action: PayloadAction<boolean>) => {
      state.isPostBoxShown = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { showPostBox } = userPostSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userPostSlice.reducer;

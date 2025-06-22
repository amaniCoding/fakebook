import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FeedState {
  isReactionBoxShown: boolean;
}

// Define the initial state using that type
const initialState: FeedState = {
  isReactionBoxShown: false,
};

export const feedSlice = createSlice({
  name: "feedSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showReactionBox: (state, action: PayloadAction<boolean>) => {
      state.isReactionBoxShown = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { showReactionBox } = feedSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default feedSlice.reducer;

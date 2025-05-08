import { CurrentStoryPhotos, Story, StoryPhoto } from "@/app/types/db/story";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface StoryState {
  allStories: Story[];
  currentStory: Story | undefined;
  currentStoryPhotos: {
    loading: boolean;
    currentStoryPhotos: StoryPhoto[];
  };
  allStoryWithPhotos: StoryPhoto[];
}

// Define the initial state using that type
const initialState: StoryState = {
  allStories: [],
  allStoryWithPhotos: [],
  currentStory: {
    fname: "",
    lname: "",
    profilepic: "",
    storyid: "",
  },
  currentStoryPhotos: {
    loading: true,
    currentStoryPhotos: [],
  },
};

export const userStorySlice = createSlice({
  name: "story",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.allStories = action.payload;
    },

    setCurrentStory: (state, action: PayloadAction<Story | undefined>) => {
      state.currentStory = action.payload;
    },

    setCurrentStoryPhotos: (
      state,
      action: PayloadAction<CurrentStoryPhotos>
    ) => {
      state.currentStoryPhotos = action.payload;
    },

    setAllStoriesWithPhotos: (state, action: PayloadAction<StoryPhoto[]>) => {
      state.allStoryWithPhotos = action.payload;
    },
  },

  // Use the PayloadAction type to declare the contents of `action.payload`
});

export const { setStories, setCurrentStory, setCurrentStoryPhotos } =
  userStorySlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userStorySlice.reducer;

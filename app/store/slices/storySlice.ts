import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryResultRow } from "@vercel/postgres";

// Define a type for the slice state
interface StoryState {
  stories: QueryResultRow[];
  storyPhotos: QueryResultRow[];
  currentStory: QueryResultRow;
  currentStoryPhotos: QueryResultRow[];
}

// Define the initial state using that type
const initialState: StoryState = {
  stories: [],
  storyPhotos: [],
  currentStory: {},
  currentStoryPhotos: [],
};

export const storySlice = createSlice({
  name: "story",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<QueryResultRow[]>) => {
      state.stories = action.payload;
    },

    setStoryPhotos: (state, action: PayloadAction<QueryResultRow[]>) => {
      state.storyPhotos = action.payload;
    },

    setCurrentStory: (state, action: PayloadAction<number>) => {
      const currentStory = state.stories[action.payload];
      state.currentStory = currentStory;

      const tempcurrentStoryPhotos: QueryResultRow[] = [];
      console.log("allswithphotos", state.storyPhotos);
      state.storyPhotos.map((story) => {
        if (story.storyid === currentStory.storyid) {
          tempcurrentStoryPhotos.push(story);
        }
      });

      state.currentStoryPhotos = tempcurrentStoryPhotos;
    },
    setCurrentStoryPhotos: (state, action: PayloadAction<QueryResultRow[]>) => {
      state.currentStoryPhotos = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {
  setStories,
  setCurrentStory,
  setCurrentStoryPhotos,
  setStoryPhotos,
} = storySlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default storySlice.reducer;

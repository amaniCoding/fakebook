import { CurrentStoryPhotosPayload } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QueryResultRow } from "@vercel/postgres";

// Define a type for the slice state
interface StoryState {
  stories: QueryResultRow[];
  storyPhotos: QueryResultRow[];
  currentStory: QueryResultRow | undefined;
  currentStoryPhotos: QueryResultRow[];
  currentPhotoIndex: number;
  currentStoryIndex: number;
}

// Define the initial state using that type
const initialState: StoryState = {
  stories: [],
  storyPhotos: [],
  currentStory: {},
  currentStoryPhotos: [],
  currentPhotoIndex: 0,
  currentStoryIndex: 0,
};

export const userStorySlice = createSlice({
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

    setCurrentStory: (
      state,
      action: PayloadAction<QueryResultRow | undefined>
    ) => {
      state.currentStory = action.payload;
      state.currentPhotoIndex = 0;
    },

    setCurrentStoryIndex: (state, action: PayloadAction<number>) => {
      state.currentStoryIndex = action.payload;
    },
    setCurrentStoryPhotos: (
      state,
      action: PayloadAction<CurrentStoryPhotosPayload>
    ) => {
      if (action.payload.type === "first") {
        state.currentStoryPhotos = action.payload.photos;
      } else {
        const tempcurrentStoryPhotos: QueryResultRow[] = [];
        console.log("allswithphotos", state.storyPhotos);
        state.storyPhotos.map((story) => {
          if (story.storyid === state.currentStory?.storyid) {
            tempcurrentStoryPhotos.push(story);
          }
        });

        state.currentStoryPhotos = tempcurrentStoryPhotos;
      }
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {
  setStories,
  setCurrentStory,
  setCurrentStoryPhotos,
  setStoryPhotos,
  setCurrentStoryIndex,
} = userStorySlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userStorySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ReactionInfoPayLoad } from "@/app/types/store/reaction";
import {
  MediaCommentPayload,
  MediaReactionInfoPayLoad,
} from "@/app/types/store/media";
import { postOption, SubmittedPostType } from "@/app/types/store/post";
import { CommentPayLoad } from "@/app/types/store/comment";
import { APost, Post } from "@/app/types/frontend/post";

// Define a type for the slice state
interface StoryState {
  isPostBoxShown: boolean;
  post: string;
  postOption: postOption;
  rows: number | undefined;
  marginTop: number;
  submittedPost: SubmittedPostType | undefined;
  postBoxHeights: {
    text: string | undefined;
  };

  feeds: Post[];
  aPost: APost | undefined;
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

  postBoxHeights: {
    text: "auto",
  },

  feeds: [],
  aPost: undefined,
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

    setRows: (state, action: PayloadAction<number | undefined>) => {
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

    setPostBoxHeight: (
      state,
      action: PayloadAction<{
        text: string | undefined;
      }>
    ) => {
      state.postBoxHeights = action.payload;
    },
    setFeeds: (state, action: PayloadAction<Post[]>) => {
      state.feeds = action.payload;
    },
    setAPost: (state, action: PayloadAction<APost | undefined>) => {
      state.aPost = action.payload;
    },
    updateFeedsWithReactionInfo: (
      state,
      action: PayloadAction<ReactionInfoPayLoad>
    ) => {
      const feed = state.feeds.find((_feed: { postId: string }) => {
        return _feed.postId === action.payload.postId;
      });

      if (feed) {
        feed.reactionInfo = action.payload.reactionInfo;
      }
    },
    updateFeedsWithNewPost: (state, action: PayloadAction<Post>) => {
      state.feeds.unshift(action.payload);
    },
    updateFeedsWithComment: (state, action: PayloadAction<CommentPayLoad>) => {
      const feed = state.feeds.find((_feed: { postId: string }) => {
        return _feed.postId === action.payload.postId;
      });
      if (feed && action.payload.comment) {
        feed.commentInfo.comments.push(action.payload.comment);
        const newCommentCount = parseInt(feed.commentInfo.commentsCount) + 1;
        const newCommentCountString = newCommentCount.toString();
        feed.commentInfo.commentsCount = newCommentCountString;
      }
    },

    updateAPostWithReactionInfo: (
      state,
      action: PayloadAction<MediaReactionInfoPayLoad>
    ) => {
      const media = state.aPost?.medias.find((media) => {
        if (media.mediaId === action.payload.mediaId) {
          return true;
        } else {
          return false;
        }
      });
      if (media) {
        media.reactionInfo = action.payload.reactionInfo;
      }
    },

    updateAPostWithCommentInfo: (
      state,
      action: PayloadAction<MediaCommentPayload>
    ) => {
      if (action.payload.comment) {
        const media = state.aPost?.medias.find((media) => {
          if (media.mediaId === action.payload.mediaId) {
            return true;
          } else {
            return false;
          }
        });
        if (media) {
          media.commentInfo.comments.push(action.payload.comment);
          const newCommentCount = parseInt(media.commentInfo.count) + 1;
          const newCommentCountString = newCommentCount.toString();
          media.commentInfo.count = newCommentCountString;
        }
      }
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
  setPostBoxHeight,
  setFeeds,
  setAPost,
  updateFeedsWithReactionInfo,
  updateAPostWithReactionInfo,
  updateAPostWithCommentInfo,
  updateFeedsWithComment,
  updateFeedsWithNewPost,
} = userPostSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userPostSlice.reducer;

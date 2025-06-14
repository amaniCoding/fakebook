import { Posts } from "@/app/libs/data/user/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CommentPayLoad,
  LikeActionState,
  postInfo,
  PostInfoCommentPayload,
  postOption,
  SubmittedPostType,
  UpdateFeedActionPayload,
  UpdatePostInfoActionPayload,
} from "./types";

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

  feeds: Posts[];
  likeActionState: LikeActionState;
  postInfo: postInfo | undefined;
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
  likeActionState: {
    loading: false,
    error: false,
    reactionInfo: {
      isReacted: false,
      reactionGroup: [
        {
          count: "",
          reactiontype: "",
        },
      ],
      reactions: "",
      reactionType: "",
      firstReactorInfo: {
        reactionId: "",
        reactionType: "",
        reactor: "",
      },
    },
  },
  postInfo: {
    postId: "",
    post: "",
    date: "",
    user: {
      userId: "",
      fname: "",
      lname: "",
      profilePic: "",
    },
    medias: [],
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
    setFeeds: (state, action: PayloadAction<Posts[]>) => {
      state.feeds = action.payload;
    },
    setPostInfo: (state, action: PayloadAction<postInfo | undefined>) => {
      state.postInfo = action.payload;
    },
    updateFeeds: (state, action: PayloadAction<UpdateFeedActionPayload>) => {
      const feed = state.feeds.find((_feed) => {
        return _feed.postId === action.payload.postId;
      });
      if (feed && action.payload.reactionInfo) {
        feed.reactionInfo = action.payload.reactionInfo;
      }
    },

    updateFeedWithComment: (
      state,
      action: PayloadAction<CommentPayLoad | undefined>
    ) => {
      const feed = state.feeds.find((_feed) => {
        return _feed.postId === action.payload?.postId;
      });
      if (feed && action.payload?.commentData) {
        feed.commentInfo.comments.push(action.payload.commentData);
      }
    },

    updatePostInfo: (
      state,
      action: PayloadAction<UpdatePostInfoActionPayload>
    ) => {
      if (action.payload.reactionInfo) {
        const media = state.postInfo?.medias.find((media) => {
          if (media.mediaid === action.payload.mediaId) {
            return true;
          } else {
            return false;
          }
        });
        if (media) {
          media.reactionInfo = action.payload.reactionInfo;
        }
      }
    },

    updatePostInfoWithComments: (
      state,
      action: PayloadAction<PostInfoCommentPayload>
    ) => {
      if (action.payload.comment) {
        const media = state.postInfo?.medias.find((media) => {
          if (media.mediaid === action.payload.mediaId) {
            return true;
          } else {
            return false;
          }
        });
        if (media) {
          media.commentInfo.comments.push(action.payload.comment);
        }
      }
    },

    setLikeStateAction: (state, action: PayloadAction<LikeActionState>) => {
      state.likeActionState = action.payload;
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
  setPostInfo,
  updateFeeds,
  updatePostInfo,
  updatePostInfoWithComments,
  updateFeedWithComment,
  setLikeStateAction,
} = userPostSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userPostSlice.reducer;

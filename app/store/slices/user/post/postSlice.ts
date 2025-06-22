import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ReactionInfoPayLoad,
  ReactionLoadingPayLoad,
  ReactionPagePayLoad,
  ReactionReactorsPayLoad,
} from "@/app/types/store/reaction";
import {
  MediaCommentPayload,
  MediaCommentsPayload,
  MediaReactionInfoPayLoad,
  MediaPagePayload,
  MeidaLoadingPayload,
} from "@/app/types/store/media";
import {
  InsertCommentAction,
  postOption,
  SubmittedPostType,
  PagePayload,
  PostsPayload,
  loadingPayload,
} from "@/app/types/store/post";
import { CommentPayLoad } from "@/app/types/store/comment";
import { APost, Post } from "@/app/types/frontend/post";
import { Comment } from "@/app/types/frontend/comment";

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

  feeds: {
    rowsCount: number | null;
    posts: Post[];
    page: number;
  };
  aPost: APost | undefined;
  insertComment: {
    loading: false;
    comment: Comment[];
  };
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

  feeds: {
    rowsCount: 0,
    posts: [],
    page: 1,
  },
  aPost: undefined,
  insertComment: {
    loading: false,
    comment: [],
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
    setFeeds: (state, action: PayloadAction<PostsPayload>) => {
      state.feeds.page = action.payload.page;
      state.feeds.rowsCount = action.payload.rowCount;
    },
    feedFeeds: (state, action: PayloadAction<Post[]>) => {
      state.feeds.posts = [...state.feeds.posts, ...action.payload];
    },
    setAPost: (state, action: PayloadAction<APost | undefined>) => {
      state.aPost = action.payload;
    },
    updateFeedsWithReactionInfo: (
      state,
      action: PayloadAction<ReactionInfoPayLoad>
    ) => {
      const feed = state.feeds.posts.find((_feed: { postId: string }) => {
        return _feed.postId === action.payload.postId;
      });

      if (feed) {
        feed.reactionInfo = action.payload.reactionInfo;
      }
    },
    updateFeedsWithNewPost: (state, action: PayloadAction<Post>) => {
      state.feeds.posts.unshift(action.payload);
    },
    updateFeedsWithComment: (state, action: PayloadAction<CommentPayLoad>) => {
      const feed = state.feeds.posts.find((_feed: { postId: string }) => {
        return _feed.postId === action.payload.postId;
      });
      if (feed && action.payload.comment) {
        feed.commentInfo.comments.comments.push(action.payload.comment);
        const newCommentCount = parseInt(feed.commentInfo.commentsCount) + 1;
        feed.commentInfo.commentsCount = newCommentCount.toString();
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
          media.commentInfo.comments.comments.push(action.payload.comment);
          const newCommentCount = parseInt(media.commentInfo.count) + 1;
          media.commentInfo.count = newCommentCount.toString();
        }
      }
    },

    setPostComments: (state, action: PayloadAction<InsertCommentAction>) => {
      const feed = state.feeds.posts.find((feed) => {
        return feed.postId === action.payload.postId;
      });

      feed!.commentInfo.comments.comments = [
        ...feed!.commentInfo.comments.comments,
        ...action.payload.comments,
      ];

      feed!.commentInfo.comments.loading = false;
    },

    setMediaComments: (state, action: PayloadAction<MediaCommentsPayload>) => {
      const media = state.aPost?.medias.find((media) => {
        if (media.mediaId === action.payload.mediaId) {
          return true;
        } else {
          return false;
        }
      });
      if (media) {
        media.commentInfo.comments.comments = [
          ...media.commentInfo.comments.comments,
          ...action.payload.comments,
        ];
        media.commentInfo.comments.loading = false;
      }
    },

    updatePostCommentPage: (state, action: PayloadAction<PagePayload>) => {
      const feed = state.feeds.posts.find((feed) => {
        return feed.postId === action.payload.postId;
      });

      feed!.commentInfo.comments.page = action.payload.page;
    },

    updatePostReactionPage: (
      state,
      action: PayloadAction<ReactionPagePayLoad>
    ) => {
      const feed = state.feeds.posts.find((feed) => {
        return feed.postId === action.payload.postId;
      });

      if (feed) {
        const reaction = feed.groupReactionInfo.find((reactionInfo) => {
          return (
            reactionInfo[action.payload.reactionType].reactionType ===
            action.payload.reactionType
          );
        });
        if (reaction) {
          reaction[action.payload.reactionType].page = action.payload.page;
        }
      }
    },

    updatePostReactionReactors: (
      state,
      action: PayloadAction<ReactionReactorsPayLoad>
    ) => {
      const feed = state.feeds.posts.find((feed) => {
        return feed.postId === action.payload.postId;
      });

      if (feed) {
        const reaction = feed.groupReactionInfo.find((reactionInfo) => {
          return (
            reactionInfo[action.payload.reactionType].reactionType ===
            action.payload.reactionType
          );
        });
        if (reaction) {
          reaction[action.payload.reactionType].reactors = [
            ...reaction[action.payload.reactionType].reactors,
            ...action.payload.reactors,
          ];
          reaction[action.payload.reactionType].loading = false;
        }
      }
    },

    updatePostReactionLoading: (
      state,
      action: PayloadAction<ReactionLoadingPayLoad>
    ) => {
      const feed = state.feeds.posts.find((feed) => {
        return feed.postId === action.payload.postId;
      });

      if (feed) {
        const reaction = feed.groupReactionInfo.find((reactionInfo) => {
          return (
            reactionInfo[action.payload.reactionType].reactionType ===
            action.payload.reactionType
          );
        });
        if (reaction) {
          reaction[action.payload.reactionType].loading =
            action.payload.loading;
        }
      }
    },

    updatePostLoading: (state, action: PayloadAction<loadingPayload>) => {
      const feed = state.feeds.posts.find((feed) => {
        return feed.postId === action.payload.postId;
      });

      if (feed) {
        feed.commentInfo.comments.loading = action.payload.loading;
      }
    },

    updatePostMediaCommentPage: (
      state,
      action: PayloadAction<MediaPagePayload>
    ) => {
      const media = state.aPost?.medias.find((media) => {
        if (media.mediaId === action.payload.mediaId) {
          return true;
        } else {
          return false;
        }
      });
      if (media) {
        media.commentInfo.comments.page = action.payload.page;
      }
    },

    updatePostMediaCommentLoading: (
      state,
      action: PayloadAction<MeidaLoadingPayload>
    ) => {
      const media = state.aPost?.medias.find((media) => {
        if (media.mediaId === action.payload.mediaId) {
          return true;
        } else {
          return false;
        }
      });
      if (media) {
        media.commentInfo.comments.loading = action.payload.loading;
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
  feedFeeds,
  setAPost,
  updateFeedsWithReactionInfo,
  updateAPostWithReactionInfo,
  updateAPostWithCommentInfo,
  updateFeedsWithComment,
  updatePostMediaCommentLoading,
  setPostComments,
  updateFeedsWithNewPost,
  setMediaComments,
  updatePostLoading,
  updatePostCommentPage,
  updatePostReactionPage,
  updatePostReactionReactors,
  updatePostMediaCommentPage,
  updatePostReactionLoading,
} = userPostSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default userPostSlice.reducer;

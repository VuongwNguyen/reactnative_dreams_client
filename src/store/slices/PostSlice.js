import {createSlice} from '@reduxjs/toolkit';
import {
  APIFollowingPost,
  APIGetPostByUser,
  APIGetPostDetail,
  APIGetTrendingPost,
  APILikePost,
  APICreatePost,
} from '../api/PostAPI';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    trending: {
      data: [],
      loading: true,
    },
    followed: {
      data: [],
      loading: true,
    },
    posted: {
      data: [],
      loading: true,
    },
    currentPostDetail: {},
    postLike: {},
  },
  reducers: {
    setListData: (state, action) => {
      const {listKey, data} = action.payload;
      if (state[listKey] && !state[listKey].loading) {
        state[listKey].data = data;
      }
      state[listKey].loading = false;
    },
    setListLoading: (state, action) => {
      const {listKey, loading} = action.payload;
      if (state[listKey]) {
        state[listKey].loading = loading;
      }
    },
    setCommentCount: (state, action) => {
      const {listKey, id, commentCount} = action.payload;
      if (state[listKey]) {
        state[listKey].data = state[listKey].data.map(post =>
          post._id === id ? {...post, commentCount} : post,
        );
      }
      if (state.currentPostDetail._id === id) {
        state.currentPostDetail.commentCount = commentCount;
      }
    },

    setToggleLike: (state, action) => {
      const {listKey, id} = action.payload;
      if (state[listKey]) {
        state[listKey].data = state[listKey].data.map(post =>
          post._id === id
            ? {
                ...post,
                isLiked: state.postLike.isLiked,
                likeCount: state.postLike.currentLike,
              }
            : post,
        );
      }
      if (state.currentPostDetail._id === id) {
        state.currentPostDetail = {
          ...state.currentPostDetail,
          isLiked: state.postLike.isLiked,
          likeCount: state.postLike.currentLike,
        };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(APIGetTrendingPost.fulfilled, (state, action) => {
        state.trending.data = action.payload.list;
        state.trending.loading = false;
      })
      .addCase(APIFollowingPost.fulfilled, (state, action) => {
        state.followed.data = action.payload.list;
        state.followed.loading = false;
      })
      .addCase(APIGetPostByUser.fulfilled, (state, action) => {
        state.posted.data = action.payload.list;
        state.posted.loading = false;
      })
      .addCase(APILikePost.fulfilled, (state, action) => {
        state.postLike = action.payload.data;
      })
      .addCase(APIGetPostDetail.fulfilled, (state, action) => {
        state.currentPostDetail = action.payload.data.post;
      })
      .addCase(APICreatePost.fulfilled, (state, action) => {
        if (action?.payload?.childrenPost) return;
        state.trending.data = [action.payload, ...state.trending.data];
      });
  },
});

export const {
  setListData,
  setListLoading,
  setCommentCount,
  setPostCreated,
  resetPostCreated,
  setToggleLike,
} = postSlice.actions;

export default postSlice.reducer;

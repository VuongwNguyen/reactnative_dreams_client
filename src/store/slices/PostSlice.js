import {createSlice} from '@reduxjs/toolkit';
import {
  APIGetPostsTrending,
  APIFollowingPost,
  APIGetPostByUser,
  APIGetPostDetail,
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
    isPostCreated: false,
  },
  reducers: {
    setListData: (state, action) => {
      const {listKey, data} = action.payload;
      if (state[listKey]) {
        state[listKey].data = data;
        state[listKey].loading = false;
      }
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
        state[listKey].data = state[listKey].data?.map(post =>
          post._id === id
            ? {
                ...post,
                isLiked: !post.isLiked,
                likeCount: post.isLiked
                  ? post.likeCount - 1
                  : post.likeCount + 1,
              }
            : post,
        );
      }
      if (state.currentPostDetail._id === id) {
        state.currentPostDetail = {
          ...state.currentPostDetail,
          isLiked: !state.currentPostDetail.isLiked,
          likeCount: state.currentPostDetail.isLiked
            ? state.currentPostDetail.likeCount - 1
            : state.currentPostDetail.likeCount + 1,
        };
      }
    },
    setPostCreated: state => {
      state.isPostCreated = true;
    },
    resetPostCreated: state => {
      state.isPostCreated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(APIGetPostsTrending.fulfilled, (state, action) => {
        state.trending.data = action.payload.data;
        state.trending.loading = false;
      })
      .addCase(APIFollowingPost.fulfilled, (state, action) => {
        state.followed.data = action.payload.data;
        state.followed.loading = false;
      })
      .addCase(APIGetPostByUser.fulfilled, (state, action) => {
        state.posted.data = action.payload.data;
        state.posted.loading = false;
      })
      .addCase(APIGetPostDetail.fulfilled, (state, action) => {
        state.currentPostDetail = action.payload.data.post;
      });
  },
});

export const {
  setListData,
  setListLoading,
  setCommentCount,
  setToggleLike,
  setPostCreated,
  resetPostCreated,
} = postSlice.actions;

export default postSlice.reducer;

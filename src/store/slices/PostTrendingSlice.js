import { createSlice } from '@reduxjs/toolkit';
import { APIGetPostsTrending } from '../api/PostAPI';

export const postTrendingSlice = createSlice({
  name: 'postTrending',
  initialState: {
    data: {},
    currentPostDetail: {},
    loading: true,
    isPostCreated: false,
  },
  reducers: {
    setData: (state, action) => {      
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPostCreated: (state) => {
      state.isPostCreated = true; // Đặt lại trạng thái khi đã tạo bài viết
    },
    getPostDetail: (state, action) => {
      const { id } = action.payload;
      state.currentPostDetail = state.data.find(post => post._id === id);
    },
    setCommentCount: (state, action) => {
      const { id, commentCount } = action.payload;
      console.log('commentCount', commentCount);
      
      
      state.data = state.data.map(post => {
        if (post._id === id) {
          return {
            ...post,
            commentCount,
          };
        }
        return post;
      })
      
      state.currentPostDetail = state.data.find(post => post._id === id);
    },
    setToggleLike: (state, action) => {      
      const {id} = action.payload;
      state.data = state.data.map(post => {
        if (post._id === id) {
          console.log('dô');
          
          return {
            ...post,
            isLiked: !post.isLiked,
            likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
          };
        }
        return post;
      })
      if (id === state.currentPostDetail._id) {
        state.currentPostDetail = {
          ...state.currentPostDetail,
          isLiked: !state.currentPostDetail.isLiked,
          likeCount: state.currentPostDetail.isLiked
            ? state.currentPostDetail.likeCount - 1
            : state.currentPostDetail.likeCount + 1,
        }
      }
    },
    resetPostCreated: (state) => {
      state.isPostCreated = false; // Đặt lại trạng thái khi đã xử lý
    }
  },
  extraReducers: builder => {
    builder.addCase(APIGetPostsTrending.fulfilled, (state, action) => {
      // state.data = action.payload.data;
      state.loading = false;
    });
  },
});

export const { setPostCreated, resetPostCreated, setData, getPostDetail, setCommentCount, setToggleLike } = postTrendingSlice.actions;

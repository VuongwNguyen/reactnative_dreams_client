import {createSlice} from '@reduxjs/toolkit';
import { APIGetPostDetail } from '../api/PostAPI';

export const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState: {
    // "post": {
    //         "_id": "6704e153922d674bb75329db",
    //         "title": "sjkhkshjks",
    //         "content": "example content post 222222",
    //         "privacy_status": "public",
    //         "images": [
    //             {
    //                 "url": "https://res.cloudinary.com/dv2vrpiih/image/upload/v1728373074/images/vsvi3gpysvsxhrvvhlbh.png",
    //                 "_id": "6704e153922d674bb75329dc"
    //             }
    //         ],
    //         "videos": [],
    //         "tagUsers": [],
    //         "hashtags": [
    //             {
    //                 "_id": "6704d5a4400e50b1480296d2",
    //                 "title": "hjhjx"
    //             },
    //             {
    //                 "_id": "6704d5a4400e50b1480296d4",
    //                 "title": "sjhjhsjhs"
    //             }
    //         ],
    //         "createdAt": "2024-10-01T07:37:55.276Z",
    //         "author": {
    //             "_id": "67052e0c69fdb7f92f6e3b29",
    //             "fullname": "nghia1 huu",
    //             "avatar": "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg"
    //         },
    //         "followedStatus": false,
    //         "likeCount": 0,
    //         "isLiked": false,
    //         "commentCount": 23
    //     },
    //     "comments": {
    //         "list": [
    //             {
    //                 "_id": "6710707f4bb8ced9848e838a",
    //                 "content": "oke nhaaaaaaaaaaaaaaa",
    //                 "createdAt": "2024-10-17T02:03:43.472Z",
    //                 "author": {
    //                     "_id": "67106adc4bb8ced9848e82bb",
    //                     "fullname": "nghia9 huu9",
    //                     "avatar": {
    //                         "url": "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg"
    //                     }
    //                 },
    //                 "childCommentCount": 3,
    //                 "isLike": true,
    //                 "likes": 1
    //             },
    //         ],
    //         "page": {
    //             "maxPage": 3,
    //             "currentPage": 1,
    //             "limit": 10,
    //             "hasNext": true,
    //             "hasPrevious": false
    //         }
    //     }
    data: {},
    loading: true,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(APIGetPostDetail.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
  },
});

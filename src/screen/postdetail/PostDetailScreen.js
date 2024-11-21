import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import CommentItem from '../../components/CommentItem';
import {postDetailStyle} from '../../styles/postdetailstyle/PostDetailStyle';
import AppHeader from '../../components/Header';
import {Assets} from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {APIGetPostDetail} from '../../store/api/PostAPI';
import ItemPost from '../../components/ItemPost';
import AxiosInstance from '../../configs/axiosInstance';
import {childCommentSlice} from '../../store/slices/ChildCommentSlice';
import { getPostDetail, setCommentCount } from '../../store/slices';

const PostDetailScreen = props => {
  const post_id = props.route?.params?.post_id;

  const {t} = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const {currentPostDetail} = useSelector(state => state.postTrending);
  const [data, setPost] = useState(null);
  const [list, setList] = useState(data?.comments?.list || []);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [replyId, setReplyId] = useState(null);
  const [commentFocus, setCommentFocus] = useState(null);
  const {userBasicInfData} = useSelector(state => state.userBasicInf);

  // useEffect(() => {
  //   console.log('currentPostDetail', currentPostDetail);
    
  // }, [currentPostDetail]);

  useEffect(() => {
    dispatch(APIGetPostDetail(post_id))
      .unwrap()
      .then(res => {
        setPost(res.data);
        setList(res.data?.comments?.list);
        setLoading(false);
      });
      dispatch(getPostDetail({id:post_id}))
  }, []);

  const handleCancelReply = () => {
    setReplyId(null);
    setCommentFocus(null);
  };

  const handleSendComment = async () => {
    try {
      const data = {
        content,
        post_id,
      };
      if (replyId) {
        data.reply_comment_id = replyId;
      }
      setReplyId(null);
      AxiosInstance()
        .post('/comment', data)
        .then(res => {
          const replyCommentId = res.data.reply_comment_id;
          if (!replyCommentId) {
            const newData = [...list];
            const newComment = {
              ...res.data,
              author: {
                fullname: userBasicInfData?.fullname,
                avatar: {url: userBasicInfData?.avatar},
              },
              likes: 0,
            };
            newData.unshift(newComment);
            setList(newData);
          } else {
            const newComment = {
              ...res.data,
              author: {
                fullname: userBasicInfData?.fullname,
                avatar: {url: userBasicInfData?.avatar},
              },
              likes: 0,
            };
            dispatch(childCommentSlice.actions.setPushChildComment(newComment));
          }
          dispatch(setCommentCount({id: post_id, commentCount: currentPostDetail.commentCount + 1}));
          setContent('');
          setCommentFocus(null);
          inputRef.current.clear();
        });
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View style={postDetailStyle.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00C3FE" />
      ) : (
        <>
          <AppHeader title={t('postDetailScreen.post')} />
          <FlatList
            style={{flex: 1}}
            key={data?._id}
            data={list}
            renderItem={({item}) => (
              <View style={{padding: 10}} key={item._id}>
                <CommentItem
                  comment={item}
                  inputRef={inputRef}
                  commentFocus={commentFocus}
                  setCommentFocus={setCommentFocus}
                  replyId={replyId}
                  setReplyId={setReplyId}
                />
              </View>
            )}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <ItemPost item={currentPostDetail} />
            }
          />
          {commentFocus && (
            <View
              style={{
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text>
                {t('postDetailScreen.replyingTo')}{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {commentFocus?.author?.fullname}
                </Text>
              </Text>
              <TouchableOpacity onPress={() => handleCancelReply()}>
                <Text
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                  }}>
                  {t('postDetailScreen.cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={postDetailStyle.footer}>
            <Image
              style={postDetailStyle.avatarFooter}
              source={{uri: userBasicInfData?.avatar}}
            />
            <TextInput
              ref={inputRef}
              onChangeText={text => setContent(text)}
              style={postDetailStyle.inputComment}
              placeholder={t('postDetailScreen.writeComment')}
            />
            {content && (
              <TouchableOpacity
                onPress={handleSendComment}
                style={postDetailStyle.buttonSendComment}>
                <Image
                  source={Assets.icons.send}
                  style={postDetailStyle.iconSend}
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default PostDetailScreen;

import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import CommentItem from '../../components/CommentItem';
import {postDetailStyle} from '../../styles/postdetailstyle/PostDetailStyle';
import AppHeader from '../../components/Header';
import {Assets} from '../../styles';
import {useDispatch} from 'react-redux';
import {APIGetPostDetail} from '../../store/api/PostAPI';
import ItemPostInDetail from '../../components/ItemPostInDetail';

const PostDetailScreen = props => {
  const post_id = props.route?.params?.post_id;
  // console.log(post_id);

  const {t} = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [post, setPost] = useState('');

  useEffect(() => {
    dispatch(APIGetPostDetail(post_id))
      .unwrap()
      .then(res => {
        setPost(res.data);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, [post_id]);
  return (
    <View style={postDetailStyle.container}>
      <AppHeader title={t('postDetailScreen.post')} />
      <FlatList
        style={{flex: 1}}
        data={post?.comments?.list}
        renderItem={({item}) => (
          <View style={{padding: 10}}>
            <CommentItem comment={item} inputRef={inputRef} />
          </View>
        )}
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ItemPostInDetail item={post} />}
      />
      <View style={postDetailStyle.footer}>
        <Image
          style={postDetailStyle.avatarFooter}
          source={{uri: post?.post?.author?.avatar?.url}}
        />
        <TextInput
          ref={inputRef}
          style={postDetailStyle.inputComment}
          placeholder={t('postDetailScreen.writeComment')}
        />
        <TouchableOpacity style={postDetailStyle.buttonSendComment}>
          <Image source={Assets.icons.send} style={postDetailStyle.iconSend} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostDetailScreen;

const postDetail = {
  name: 'Velerie Hiddersley',
  avatar:
    'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
  hour: '1 hour ago',
  title:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  content:
    'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
  image: [
    'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    'https://i.pinimg.com/236x/db/7b/f4/db7bf49e8745f88a21fb74d73851d572.jpg',
    'https://i.pinimg.com/236x/16/90/2d/16902d6ebaefea0fb48fdbc70bac939d.jpg',
  ],
  like: 8,
  comment: 0,
  share: 0,
};

const comments = [
  {
    id: '1',
    user: 'user 1',
    content: 'How are you my friend, when are you comming home?',
    createdAt: '1h ago',
    replies: [
      {
        id: '1-1',
        user: 'user 2',
        content: 'How are you my friend, when are you comming home?',
        createdAt: '30m ago',
        replies: [
          {
            id: '1-1-1',
            user: 'user4',
            content:
              'How are you my friend, when are you comming home?.How are you my friend, when are you comming home?',
            createdAt: '15m ago',
            replies: [],
          },
          {
            id: '1-1-2',
            user: 'user 4',
            content: 'How are you my friend, when are you comming home?',
            createdAt: '15m ago',
            replies: [],
          },
        ],
      },
      {
        id: '1-2',
        user: 'user 5',
        content: 'I agree as well!',
        createdAt: '25m ago',
        replies: [],
      },
      {
        id: '1-3',
        user: 'user 6',
        content: 'Nice work!',
        createdAt: '20m ago',
        replies: [],
      },
    ],
  },
  {
    id: '2',
    user: 'user 3',
    content: 'Great post!',
    createdAt: '2h ago',
    replies: [],
  },
];

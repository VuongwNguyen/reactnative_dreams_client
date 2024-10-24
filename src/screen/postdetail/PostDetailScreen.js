import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
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
import ItemPost from '../../components/ItemPost';

const PostDetailScreen = props => {
  const post_id = props.route?.params?.post_id;

  const {t} = useTranslation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(APIGetPostDetail(post_id))
      .unwrap()
      .then(res => {
        setData(res?.data);
        setLoading(false);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, [post_id, dispatch]);

  return (
    <View style={postDetailStyle.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <AppHeader title={t('postDetailScreen.post')} />
          <FlatList
            style={{flex: 1}}
            data={data?.comments?.list}
            renderItem={({item}) => (
              <View style={{padding: 10}}>
                <CommentItem comment={item} inputRef={inputRef} />
              </View>
            )}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<ItemPost item={data?.post} />}
          />
          <View style={postDetailStyle.footer}>
            <Image
              style={postDetailStyle.avatarFooter}
              source={{uri: data?.post?.author?.avatar}}
            />
            <TextInput
              ref={inputRef}
              style={postDetailStyle.inputComment}
              placeholder={t('postDetailScreen.writeComment')}
            />
            <TouchableOpacity style={postDetailStyle.buttonSendComment}>
              <Image
                source={Assets.icons.send}
                style={postDetailStyle.iconSend}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default PostDetailScreen;

import {ActivityIndicator, FlatList, ToastAndroid, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ItemPost from '../../components/ItemPost';
import {useDispatch} from 'react-redux';

import {PostedTabStyle} from '../../styles/profileStyle/PostedTabStyle';
import {APIGetPostByUser} from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';

const PostedTab = props => {
  const {scrollHandler} = props;
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('67010e3da2ce9ed2d170ba13');
  useEffect(() => {
    dispatch(APIGetPostByUser(userId))
      .unwrap()
      .then(res => {
        setDataPosts(res.data.list);
        setLoading(false);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, [userId]);
  return (
    <View style={PostedTabStyle.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Animated.FlatList
          onScroll={scrollHandler}
          data={dataPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ItemPost item={item} />}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

export default PostedTab;

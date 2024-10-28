import { ActivityIndicator, FlatList, ToastAndroid, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ItemPost, { ItemSeparator } from '../../components/ItemPost';
import { useDispatch } from 'react-redux';

import { PostedTabStyle } from '../../styles/profileStyle/PostedTabStyle';
import { APIGetPostByUser } from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';

const PostedTab = props => {
  const { scrollHandler, user_id_view } = props;
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(APIGetPostByUser({user_id_view}))
      .unwrap()
      .then(res => {
        setDataPosts(res?.data.list);
        setLoading(false);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, []);

  return (
    <View style={PostedTabStyle.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ededed"
          style={{ justifyContent: 'center' }}
        />
      ) : (
        <Animated.FlatList
          onScroll={scrollHandler}
          data={dataPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ItemPost item={item} />}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <ItemSeparator/>}
        />
      )}
    </View>
  );
};

export default PostedTab;
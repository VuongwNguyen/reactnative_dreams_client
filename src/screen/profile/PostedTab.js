import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState,useCallback} from 'react';
import ItemPost, {ItemSeparator} from '../../components/ItemPost';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {PostedTabStyle} from '../../styles/profileStyle/PostedTabStyle';
import {APIGetPostByUser} from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';

const PostedTab = props => {
  const {scrollHandler, user_id_view} = props;
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = () => {
    dispatch(APIGetPostByUser({user_id_view}))
      .unwrap()
      .then(res => {
        setDataPosts(res?.data.list);
        setLoading(false);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [user_id_view])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  return (
    <View style={PostedTabStyle.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ededed"
          style={{justifyContent: 'center'}}
        />
      ) : (
        <Animated.FlatList
          onScroll={scrollHandler}
          data={dataPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ItemPost item={item} />}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={() => <ItemSeparator />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default PostedTab;

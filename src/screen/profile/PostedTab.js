import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ItemPost, { ItemSeparator } from '../../components/ItemPost';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { PostedTabStyle } from '../../styles/profileStyle/PostedTabStyle';
import { APIGetPostByUser } from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';
import { Colors } from '../../styles';

const PostedTab = props => {
  const { scrollHandler, user_id_view } = props;
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [nextPage, setNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = () => {
    dispatch(APIGetPostByUser({ user_id_view }))
      .unwrap()
      .then(res => {
        const { list, page } = res;
        setNextPage(res);
        setPage(page);
        if (currentPage === 1) {
          setDataPosts(list);
        } else {
          setDataPosts(prevDataPosts => [...prevDataPosts, ...list]);
        }
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
      setRefreshing(true);
    }, [user_id_view, currentPage]),
  );

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    fetchPosts();
  };
  const onEndReached = useCallback(() => {
    if (currentPage < page.maxPage && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
      setNextPage(true);
    }
  }, [currentPage, nextPage, isLoading, dispatch]);

  const renderLoader = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color={Colors.primary} />
    ) : null;
  };

  return (
    <View style={PostedTabStyle.container}>
      <Animated.FlatList
        onScroll={scrollHandler}
        data={dataPosts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ItemPost item={item} />}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <ItemSeparator />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default PostedTab;

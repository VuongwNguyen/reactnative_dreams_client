import {
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import ItemPost, {ItemSeparator} from '../../components/ItemPost';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {PostedTabStyle} from '../../styles/profileStyle/PostedTabStyle';
import {APIGetPostByUser} from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';
import {Colors} from '../../styles';
import {setData} from '../../store/slices';

const PostedTab = props => {
  const {scrollHandler, user_id_view} = props;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {data} = useSelector(state => state.postTrending);

  const fetchPosts = () => {
    setIsLoading(true);
    dispatch(APIGetPostByUser({user_id_view, _page: currentPage}))
      .unwrap()
      .then(res => {
        const {list, page} = res;
        setPage(page);
        const newData = [...data, ...list];
        dispatch(setData(newData));
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
    }
  }, [currentPage, page.maxPage, isLoading, dispatch]);

  const renderLoader = () => {
    return isLoading && !refreshing ? (
      <ActivityIndicator size="large" color={Colors.primary} />
    ) : null;
  };

  return (
    <View style={PostedTabStyle.container}>
      <Animated.FlatList
        onScroll={scrollHandler}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ItemPost item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <ItemSeparator />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderLoader}
      />
    </View>
  );
};

export default PostedTab;

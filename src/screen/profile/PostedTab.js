import {
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
  View,
  Text,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import ItemPost, {ItemSeparator} from '../../components/ItemPost';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {PostedTabStyle} from '../../styles/profileStyle/PostedTabStyle';
import {APIGetPostByUser} from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';
import {Colors} from '../../styles';
import {setListData, setListLoading} from '../../store/slices';

const PostedTab = props => {
  const {scrollHandler, user_id_view} = props;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const postedPosts = useSelector(state => state.post.posted.data);
  // console.log(postedPosts.length);

  const fetchPosts = () => {
    dispatch(setListLoading({listKey: 'posted', loading: true}));
    setIsLoading(true);
    dispatch(APIGetPostByUser({user_id_view, _page: currentPage}))
      .unwrap()
      .then(res => {
        const {list, page} = res;
        setPage(page);
        if (currentPage === 1) {
          dispatch(setListData({listKey: 'posted', data: list}));
        } else {
          const newData = [...postedPosts, ...list];
          dispatch(setListData({listKey: 'posted', data: newData}));
        }
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      })
      .finally(() => {
        setFirstRender(false);
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
      {firstRender ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{margin: 'auto'}}
        />
      ) : postedPosts.length > 0 ? (
        <Animated.FlatList
          onScroll={scrollHandler}
          data={postedPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ItemPost item={item} type="posted" />}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={renderLoader}
        />
      ) : (
        <Text style={PostedTabStyle.placeholder}>Dòng thời gian trống!</Text>
      )}
    </View>
  );
};

export default PostedTab;

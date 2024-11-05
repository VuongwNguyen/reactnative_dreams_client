import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import ItemPost, {ItemSeparator} from '../../components/ItemPost';
import {
  APICountViewPost,
  APIGetTrendingPost,
  APISetPostViewd,
} from '../../store/api/PostAPI';
import {Colors} from '../../styles';
import {resetPostCreated} from '../../store/slices';

const TrendingPostTab = props => {
  const {scrollHandler} = props;
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const timeOutId = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [nextPage, setNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {isPostCreated} = useSelector(state => state.postTrending);
  const flatListRef = useRef(null);

  const fetchPosts = () => {
    setIsLoading(true);
    dispatch(APIGetTrendingPost(currentPage))
      .unwrap()
      .then(res => {
        const {list, page} = res;
        setPage(page);
        if (currentPage === 1) {
          setDataPosts(list);
        } else {
          setDataPosts(prevDataPosts => [...prevDataPosts, ...list]);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const onRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    fetchPosts();
  };

  useEffect(() => {
    if (isPostCreated) {
      flatListRef.current.scrollToOffset({animated: true, offset: 0});
      setCurrentPage(1);
      fetchPosts();
      dispatch(resetPostCreated());
    }
  }, [isPostCreated]);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}) => {
      if (viewableItems.length > 0) {
        clearTimeout(timeOutId.current);
        timeOutId.current = setTimeout(() => {
          dispatch(APICountViewPost(viewableItems[0].item._id));
        }, 5000);
      }

      viewableItems.forEach(item => {
        if (!viewedItemIds.includes(item.item._id)) {
          setViewedItemIds(prevViewedItemIds => {
            dispatch(APISetPostViewd(item.item._id));
            return [...prevViewedItemIds, item.item._id];
          });
        }
      });
    },
    [viewedItemIds, dispatch],
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 100,
      },
      onViewableItemsChanged,
    },
  ]);

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
    <Animated.FlatList
      ref={flatListRef}
      style={styles.container}
      onScroll={scrollHandler}
      data={dataPosts}
      renderItem={({item}) => <ItemPost item={item} />}
      keyExtractor={(item, index) => index.toString()}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={renderLoader}
    />
  );
};

export default TrendingPostTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footerIndicator: {
    padding: 10, // Thêm padding để tạo khoảng cách
  },
});

import {ActivityIndicator, RefreshControl, StyleSheet} from 'react-native';
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
import {
  setListLoading,
  setListData,
  resetPostCreated,
} from '../../store/slices';

const TrendingPostTab = props => {
  const {scrollHandler} = props;
  const dispatch = useDispatch();
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const timeOutId = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {isPostCreated} = useSelector(state => state.post);
  const trendingPosts = useSelector(state => state.post.trending.data);

  const flatListRef = useRef(null);

  const fetchPosts = () => {
    dispatch(setListLoading({listKey: 'trending', loading: true}));
    setIsLoading(true);
    dispatch(APIGetTrendingPost(currentPage))
      .unwrap()
      .then(res => {
        const {list, page} = res;
        setPage(page);
        if (currentPage === 1) {
          dispatch(setListData({listKey: 'trending', data: list}));
        } else {
          const newData = [...trendingPosts, ...list];
          dispatch(setListData({listKey: 'trending', data: newData}));
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

  // useEffect(() => {
  //   console.log('CurrentPage:', currentPage);
  // }, [currentPage]);

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
    }
  }, [currentPage, isLoading]);

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
      data={trendingPosts}
      renderItem={({item}) => <ItemPost item={item} type="trending" />}
      keyExtractor={(item, index) => index.toString()}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      ItemSeparatorComponent={() => <ItemSeparator />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
    padding: 10,
  },
});

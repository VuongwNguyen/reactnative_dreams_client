import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ItemPost, {ItemSeparator} from '../../components/ItemPost';
import {useDispatch, useSelector} from 'react-redux';
import {
  APICountViewPost,
  APIFollowingPost,
  APISetPostViewd,
} from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';
import {Colors} from '../../styles';
import {setData} from '../../store/slices';

const FollowedPostTab = props => {
  const {scrollHandler} = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({});
  const [nextPage, setNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const timeOutId = useRef(null);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {data} = useSelector(state => state.postTrending);

  const fetchPosts = () => {
    setIsLoading(true);
    dispatch(APIFollowingPost(currentPage))
      .unwrap()
      .then(res => {
        const {list, page} = res;
        setPage(page);
        if (currentPage === 1) {
          dispatch(setData(list));
        } else {
          const newData = [...data, ...list];
          dispatch(setData(newData));
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

  // Tạo ref cho callback
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 100,
      },
      onViewableItemsChanged: ({viewableItems}) => {
        clearTimeout(timeOutId.current);
        timeOutId.current = setTimeout(() => {
          if (viewableItems.length > 0) {
            dispatch(APICountViewPost(viewableItems[0].item._id));
          }
        }, 5000);

        viewableItems.forEach(item => {
          if (
            viewableItems.length > 0 &&
            !viewableItems.includes(item.item._id)
          ) {
            setViewedItemIds(prevViewedItemIds => {
              if (!prevViewedItemIds.includes(item.item._id)) {
                dispatch(APISetPostViewd(item.item._id));
                return [...prevViewedItemIds, item.item._id];
              }
              return prevViewedItemIds;
            });
          }
        });
      },
    },
  ]);

  const onEndReached = useCallback(() => {
    if (currentPage <= page.maxPage && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
      setNextPage(true);
    }
    setNextPage(false);
  }, [currentPage, nextPage, isLoading, dispatch]);

  const renderLoader = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color={Colors.primary} />
    ) : null;
  };

  return (
    <Animated.FlatList
      style={styles.container}
      onScroll={scrollHandler}
      data={data}
      renderItem={({item}) => <ItemPost item={item} />}
      keyExtractor={(item, index) => index.toString()}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <ItemSeparator />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={renderLoader}
    />
  );
};

export default FollowedPostTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

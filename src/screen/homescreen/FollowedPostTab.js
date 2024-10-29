import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import ItemPost, { ItemSeparator } from '../../components/ItemPost';
import { useDispatch } from 'react-redux';
import {
  APICountViewPost,
  APIFollowingPost,
  APISetPostViewd,
} from '../../store/api/PostAPI';
import Animated from 'react-native-reanimated';

const FollowedPostTab = props => {
  const { scrollHandler } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const timeOutId = useRef(null);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);


  const fetchPosts = () => {
    dispatch(APIFollowingPost(currentPage))
      .unwrap()
      .then(res => {
        const { list } = res;
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
        setRefreshing(false);
      });
  }

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
      onViewableItemsChanged: ({ viewableItems }) => {
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




  return (
    <Animated.FlatList
      style={styles.container}
      onScroll={scrollHandler}
      data={dataPosts}
      renderItem={({ item }) => <ItemPost item={item} />}
      keyExtractor={(item, index) => index.toString()}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      onEndReached={() => setCurrentPage(prevPage => prevPage + 1)}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <ItemSeparator />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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

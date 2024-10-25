import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Animated from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import ItemPost from '../../components/ItemPost';
import { APICountViewPost, APIGetTrendingPost, APISetPostViewd } from '../../store/api/PostAPI';

const TrendingPostTab = (props) => {
  const { scrollHandler } = props;
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const timeOutId = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchTrendingPosts = async () => {
    if (!loading && hasMore) {
      try {
        setLoading(true);
        const res = await dispatch(APIGetTrendingPost(currentPage)).unwrap();
        if (res.list.length === 0) {
          setHasMore(false);
        } else {
          setDataPosts((prevData) => [...prevData, ...res.list]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
  }, [currentPage]);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 100,
      },
      onViewableItemsChanged: ({ viewableItems }) => {
        if (viewableItems.length > 0) {
          clearTimeout(timeOutId.current);
          timeOutId.current = setTimeout(() => {
            dispatch(APICountViewPost(viewableItems[0].item._id));
          }, 5000);
        }

        viewableItems.forEach((item) => {
          if (!viewedItemIds.includes(item.item._id)) {
            setViewedItemIds((prevViewedItemIds) => {
              dispatch(APISetPostViewd(item.item._id)); // Gọi API để đánh dấu bài viết đã xem
              return [...prevViewedItemIds, item.item._id];
            });
          }
        });
      },
    },
  ]);

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" style={styles.footerIndicator} /> : null;
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) { // Thêm điều kiện để kiểm soát khi nào tải thêm
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        onScroll={scrollHandler}
        data={dataPosts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ItemPost item={item} />}
        keyExtractor={(item) => item._id.toString()}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default TrendingPostTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  footerIndicator: {
    padding: 10, // Thêm padding để tạo khoảng cách
  },
});

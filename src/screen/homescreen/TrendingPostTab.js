import {StyleSheet, View } from 'react-native';
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


  useEffect(() => {
    dispatch(APIGetTrendingPost(currentPage))
      .unwrap()
      .then(res => {
        const { list } = res;
        const newData = [...dataPosts, ...list];
        setDataPosts(newData);
      })
      .catch(err => {
        console.log(err);
      });            
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

  const ItemSeparator = () => (
    <View style={{ height: 5, backgroundColor: '#b5b5b5' }} />
  );

  return (
    <Animated.FlatList
      style={styles.container}
      onScroll={scrollHandler}
      data={dataPosts}
      renderItem={({ item }) => <ItemPost item={item} />}
      keyExtractor={(item, index) => item._id}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      onEndReached={() => setCurrentPage(prevPage => prevPage + 1)}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
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

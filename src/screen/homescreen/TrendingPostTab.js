import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Animated from 'react-native-reanimated';
import AxiosInstance from '../../configs/axiosInstance';

import ItemPost from '../../components/ItemPost';
import { useFocusEffect } from '@react-navigation/native';

const TrendingPostTab = props => {
  const {scrollHandler} = props;
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AxiosInstance().get('/post/trending-posts');
        setDataPosts(response.data.list);
        setLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleSetItemClick = async (item) => {    
    console.log(item);
    setDataPosts(dataPosts.map((post) => (post._id === item.data._id ? item.data : post)));
  };
  // console.log(dataPosts)
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 90,
      },
      onViewableItemsChanged: ({viewableItems}) => {
        viewableItems.forEach(item => {
          // console.log('Item being viewed1111:', item.item._id);
          if (timeOutId !== null) {
            clearTimeout(timeOutId);
          }
          const timeout = setTimeout(() => {
            AxiosInstance()
              .post('/post/count-view-post', {
                post_id: item.item._id,
              })
              .catch(err => {
                console.log(err);
              });
          }, 5000);
          setTimeOutId(timeout);

          if (!viewedItemIds.includes(item.item._id)) {
            setViewedItemIds(prevViewedItemIds => {
              if (!prevViewedItemIds.includes(item.item._id)) {
                AxiosInstance().post('/post/set-post-viewed', {
                  post_id: item.item._id,
                });

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
    <View style={styles.container}>
      {!loading && (
        <Animated.FlatList
          onScroll={scrollHandler}
          data={dataPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ItemPost item={item} setItemClickId={(item) => handleSetItemClick(item)}/>}
          keyExtractor={(item, index) => index.toString()}
          // Truyền vào callback để log item đang xem
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
      )}
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
});

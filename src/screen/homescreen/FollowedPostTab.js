import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ItemPost from '../../components/ItemPost';
import AxiosInstance from '../../configs/axiosInstance';

const FollowedPostTab = () => {
  // const {scrollHandler} = props;
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const timeOutId = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await AxiosInstance().get('/post/following-posts/1/10');
      setDataPosts(response.data.list);
    };
    fetchData();
  }, []);

  // Tạo ref cho callback
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 100,
      },
      onViewableItemsChanged: ({viewableItems}) => {
        console.log('timeoutId', timeOutId.current);
        clearTimeout(timeOutId.current);

        timeOutId.current = setTimeout(() => {
          AxiosInstance().post('/post/count-view-post', {
            post_id: viewableItems[0].item._id,
          })          
        }, 5000);

        viewableItems.forEach(item => {
          if ( viewedItemIds.length > 0 && !viewedItemIds.includes(item.item._id)) {
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
    <FlatList
      style={styles.container}
      data={dataPosts}
      renderItem={({item}) => <ItemPost item={item} />}
      keyExtractor={(item, index) => index.toString()}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    />
  );
};

export default FollowedPostTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

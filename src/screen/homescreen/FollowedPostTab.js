// import {FlatList, StyleSheet, View} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import ItemPost from '../../components/ItemPost';
// import Animated from 'react-native-reanimated';
// import AxiosInstance from '../../configs/axiosInstance';

// const FollowedPostTab = props => {
//   const {scrollHandler} = props;
//   const [dataPosts, setDataPosts] = useState([]);
//   const [viewedItems, setViewedItems] = useState(new Set());

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await AxiosInstance().get('/post/following-posts/1/10');
//       console.log('response', response.data.list.length);

//       setDataPosts(response.data.list);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     console.log('viewedItems', viewedItems);
//   }, [viewedItems]);

//   const viewabilityConfigCallbackPairs = useRef([
//     {
//       viewabilityConfig: {
//         itemVisiblePercentThreshold: 90, // Định nghĩa khi nào item được coi là "đang xem"
//       },
//       onViewableItemsChanged: ({viewableItems}) => {
//         viewableItems.forEach(item => {
//           console.log('Item being viewed:');
//         });
//       },
//     },
//   ]);

//   return (
//     <View style={styles.container}>
//       <Animated.ScrollView
//         style={{marginTop: 10}}
//         onScroll={scrollHandler}
//         showsVerticalScrollIndicator={false}>
//         <FlatList
//           data={dataPosts}
//           nestedScrollEnabled={true}
//           scrollEnabled={false}
//           renderItem={({item}) => <ItemPost item={item} />}
//           keyExtractor={(item, index) => index.toString()}
//           viewabilityConfigCallbackPairs={
//             viewabilityConfigCallbackPairs.current
//           }
//         />
//       </Animated.ScrollView>
//     </View>
//   );
// };

// export default FollowedPostTab;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
// });

import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ItemPost from '../../components/ItemPost';
import AxiosInstance from '../../configs/axiosInstance';

const FollowedPostTab = () => {
  // const {scrollHandler} = props;
  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [timeOutId, setTimeOutId] = useState(null);

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
        itemVisiblePercentThreshold: 90,
      },
      onViewableItemsChanged: ({viewableItems}) => {
        viewableItems.forEach(item => {
          console.log('Item being viewed1111:', item.item._id);
          if (timeOutId !== null) {
            clearTimeout(timeOutId);
          }
          const timeout = setTimeout(() => {
            console.log('ok');
            
            AxiosInstance().post('/post/count-view-post', {
              post_id: item.item._id,
            }).catch(err => {
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
    <FlatList
      style={styles.container}
      data={dataPosts}
      renderItem={({item}) => <ItemPost item={item} />}
      keyExtractor={(item, index) => index.toString()}
      // Truyền vào callback để log item đang xem
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

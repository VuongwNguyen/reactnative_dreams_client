
import { FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ItemPost from '../../components/ItemPost';
import { PostedTabStyle } from '../../styles/profileStyle/PostedTabStyle';
import AxiosInstance from '../../configs/axiosInstance';


const PostedTab = () => {

  const [dataPosts, setDataPosts] = useState([]);
  const [viewedItemIds, setViewedItemIds] = useState([]);
  const [timeOutId, setTimeOutId] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await AxiosInstance().get('/post/get-post-by-user/6708c63af2f0d8b72a591d55/1/10');
        setDataPosts(response.data.list);
        setLoading(false);
      } catch (error) {

      }
    };
    fetchData();
  }, []);
  // console.log(dataPosts)
  return (
    <FlatList
      style={PostedTabStyle.container}
      scrollEnabled={false}
      nestedScrollEnabled={true}
      data={dataPosts}
      renderItem={({ item }) => <ItemPost item={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default PostedTab;

import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlingStyle } from '../../styles/flingstyle/FlingStyle';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { APIGetFollowers, APIGetFollowing } from '../../store/api/FollowAPI';
import { current } from '@reduxjs/toolkit';

const FlingScreen = (props) => {
  const params = props.route.params
  const type = params?.type
  const user_id_view = params?.user_id_view
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (type === 'Followers') {
        const result = await dispatch(APIGetFollowers({ user_id_view, page })).unwrap();
        setData(result.list);
      }
      if (type === 'Following') {
        const result = await dispatch(APIGetFollowing({ user_id_view, page })).unwrap();
        setData(result.list);
      }
    } catch (error) {
      setIsLoading(false)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [page]);

  const RenderItems = ({ item }) => {
    return (
      <View style={FlingStyle.item}>
        <Image
          style={FlingStyle.avatar}
          source={{
            uri: item.follower?.avatar || item.user.avatar
          }}
        />
        <Text style={FlingStyle.name}>{item.follower?.fullname || item.user?.fullname}</Text>
        <TouchableOpacity
          style={item.isFollowing ? FlingStyle.flowwing : FlingStyle.flowwed}>
          <Text
            style={
              item.isFollowing
                ? FlingStyle.flowwingText
                : FlingStyle.flowwedText
            }>
            {item.isFollowing ? 'Followed' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={FlingStyle.container}>
      <Header title={type} />
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderItems item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FlingScreen;

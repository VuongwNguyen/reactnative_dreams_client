import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlingStyle } from '../../styles/flingstyle/FlingStyle';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import {
  APIGetFollowers,
  APIGetFollowing,
  APIToggleFollow,
} from '../../store/api/FollowAPI';
import { current } from '@reduxjs/toolkit';
import { id } from 'rn-emoji-keyboard';
import { stackName } from '../../navigations/screens';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FlingScreen = props => {
  const { navigation, route } = props;
  const params = route.params;
  const type = params?.type;
  const user_id_view = params?.user_id_view;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState({})
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (type === 'Followers') {
        const result = await dispatch(
          APIGetFollowers({ user_id_view, page }),
        ).unwrap();
        setTotalPages(result.page)
        setData(prevData =>
          page === 1 ? result.list : [...prevData, ...result.list],
        );
      }
      if (type === 'Following') {
        const result = await dispatch(
          APIGetFollowing({ user_id_view, page }),
        ).unwrap();
        setTotalPages(result.page)
        setData(prevData =>
          page === 1 ? result.list : [...prevData, ...result.list],
        );
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData();
  };

  const onEndReached = useCallback(() => {
    if (page < totalPages.maxPage && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [page, isLoading]);
  const renderLoader = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color={Colors.primary} />
    ) : null;
  };

  const RenderItems = ({ item }) => {
    const id_user = item.follower?._id || item.user?._id;
    const [isFollowing, setIsFollowing] = useState(item.isFollowing);

    const handleFollow = async () => {
      try {
        const body = { following: id_user };
        const result = await dispatch(APIToggleFollow(body)).unwrap();
        // console.log(result);

        // Toggle trạng thái isFollowing
        setIsFollowing(prevState => !prevState);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <View style={FlingStyle.item}>
        <TouchableOpacity
          style={FlingStyle.userInfContainer}
          onPress={() => {
            navigation.navigate(stackName.profile.name, {
              userViewId: id_user,
            });
          }}>
          <Image
            style={FlingStyle.avatar}
            source={{ uri: item.follower?.avatar || item.user.avatar }}
          />
          <Text style={FlingStyle.name}>
            {item.follower?.fullname || item.user?.fullname}
          </Text>
        </TouchableOpacity>

        {!item.isSelf && (
          <TouchableOpacity
            style={isFollowing ? FlingStyle.followed : FlingStyle.follow}
            onPress={handleFollow}>
            <Text
              style={
                isFollowing ? FlingStyle.followedText : FlingStyle.followText
              }>
              {isFollowing ? 'Followed' : 'Follow'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={FlingStyle.container}>
      <View style={{ height: 50 }}>
        <Header title={type} />
      </View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => <RenderItems item={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={FlingStyle.bodyContainer}
          ListFooterComponent={renderLoader}
        />
      ) : (
        !isLoading && <Text style={FlingStyle.placeholder}>Danh sách trống!</Text>
      )}
    </View>
  );
};

export default FlingScreen;

import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {notificationStyle} from '../../styles/notification/NotificationStyle';
import {useTranslation} from 'react-i18next';
import NotificationItem from './NotificationItem';
import {useDispatch, useSelector} from 'react-redux';
import {APIGetNotification} from '../../store/api/NotificationAPI';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import AxiosInstance from '../../configs/axiosInstance';

const NotificationScreen = () => {
  const optionsArr = ['All', 'Read', 'Unread'];
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(optionsArr[0]);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {notifications, page, loading, reload} = useSelector(
    state => state.notification,
  );

  useEffect(() => {
    dispatch(APIGetNotification({_limit: 10, _page: 1}));
  }, [dispatch]);

  const loadMore = () => {
    if (!loading && page.next) {
      dispatch(APIGetNotification({_page: page.current + 1}));
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0CBBF0" />;
  };

  function onClickTag(item) {
    setIsSelected(item);
    if (item === 'All') {
      dispatch(APIGetNotification({_limit: 10, _page: 1, type: 'all'}));
    } else if (item === 'Read') {
      dispatch(APIGetNotification({_limit: 10, _page: 1, type: 'read'}));
    } else {
      dispatch(APIGetNotification({_limit: 10, _page: 1, type: 'unread'}));
    }
  }
  async function onClick(item) {
    if (!item.is_read) {
      await AxiosInstance().put(`/notify/notification/${item._id}`);
    }
    if (item.type === 'follow') {
      navigation.navigate(stackName.profile.name, {
        userViewId: item.sender._id,
      });
    } else {
      navigation.navigate(stackName.postDetail.name, {post_id: item.post_id});
    }
  }

  return (
    <View style={notificationStyle.scrollContainer}>
      <View>
        <FlatList
          data={optionsArr}
          horizontal
          style={notificationStyle.tagContainer}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          renderItem={({item}) => (
            <TouchableOpacity
              style={
                item === isSelected
                  ? notificationStyle.tagSelected
                  : notificationStyle.tagUnSelected
              }
              onPress={() => onClickTag(item)}>
              <Text
                style={
                  item === isSelected
                    ? notificationStyle.tagLabelSelected
                    : notificationStyle.tagLabelUnSelected
                }>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={notifications}
        style={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
        refreshing={reload}
        onRefresh={() => {
          dispatch(APIGetNotification({_limit: 10, _page: 1}));
          setIsSelected('All');
        }}
        ListFooterComponent={renderFooter}
        renderItem={({item}) => (
          <NotificationItem item={item} onClick={onClick} />
        )}
      />
    </View>
  );
};

export default NotificationScreen;

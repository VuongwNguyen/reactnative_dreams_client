import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {notificationItemStyle} from '../../styles/notification/NotificationItemStyle';
import {useDayjs} from '../../configs/hooks/useDayjs';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';

const NotificationItem = ({item, onClick}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        item.is_read
          ? {backgroundColor: 'white'}
          : {backgroundColor: '#D9F6FF'},
        notificationItemStyle.container,
      ]}
      onPress={() => onClick(item)}>
      <View style={notificationItemStyle.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(stackName.profile.name, {
              userViewId: item.sender._id,
            });
          }}>
          <Image
            source={{uri: item?.sender?.avatar}}
            style={notificationItemStyle.avt}
          />
        </TouchableOpacity>

        <View style={notificationItemStyle.centerBox}>
          <Text style={notificationItemStyle.content}>
            <Text style={notificationItemStyle.username}>
              {item.sender.fullname}
            </Text>
            {
              {
                like: ` ${t('notificationScreen.likeStatus')}`,
                comment: ` ${t('notificationScreen.commentStatus')}`,
                follow: ` ${t('notificationScreen.followStatus')}`,
                post: ` ${t('notificationScreen.newPostStatus')}`,
                tagged: ` ${t('notificationScreen.taggedStatus')}`,
              }[item.type]
            }
          </Text>
        </View>
      </View>
      <View>
        <Text style={notificationItemStyle.time}>
          {useDayjs(item.createdAt).locale(t('itemPost.timeStatus')).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

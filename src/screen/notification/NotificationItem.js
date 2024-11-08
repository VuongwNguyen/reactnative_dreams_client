import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {notificationItemStyle} from '../../styles/notification/NotificationItemStyle';
import {useDayjs} from '../../configs/hooks/useDayjs';
import {useTranslation} from 'react-i18next';

const NotificationItem = ({item, onClick}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      style={[
        item.is_read
          ? {backgroundColor: '#D9F6FF'}
          : {backgroundColor: 'white'},
        notificationItemStyle.container,
      ]}
      onPress={() => onClick(item)}>
      <View style={notificationItemStyle.mainContainer}>
        <Image
          source={{uri: item?.sender?.avatar}}
          style={notificationItemStyle.avt}
        />
        <View style={notificationItemStyle.centerBox}>
          <Text style={notificationItemStyle.content}>
            <Text style={notificationItemStyle.username}>
              {item.sender.fullname}
            </Text>
            {item.type == 'like'
              ? ' liked your post'
              : item.type == 'comment'
              ? ' commented on your post'
              : item.type == 'follow'
              ? ' started following you'
              : item.type == 'post'
              ? ' has new post'
              : ' tagged you in a post'}
          </Text>

          {/* {item?.type == 'follow' ? (
            <TouchableOpacity style={notificationItemStyle.followButton}>
              <Text style={notificationItemStyle.followLabel}>Follow back</Text>
            </TouchableOpacity>
          ) : null} */}
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

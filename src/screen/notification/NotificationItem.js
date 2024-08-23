import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {notificationItemStyle} from '../../styles/notification/NotificationItemStyle';

const NotificationItem = props => {
  const {avt, username, content, time, type = '', isNew = false} = props;
  return (
    <View
      style={[
        isNew ? {backgroundColor: '#D9F6FF'} : {backgroundColor: 'white'},
        notificationItemStyle.container,
      ]}>
      <View style={notificationItemStyle.mainContainer}>
        <Image source={avt} style={notificationItemStyle.avt} />
        <View style={notificationItemStyle.centerBox}>
          <Text style={notificationItemStyle.content} numberOfLines={2}>
            <Text style={notificationItemStyle.username}>{username}</Text>{' '}
            {content}
          </Text>

          {type == 'request' ? (
            <TouchableOpacity style={notificationItemStyle.followButton}>
              <Text style={notificationItemStyle.followLabel}>Follow back</Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
      </View>
      <View>
        <Text style={notificationItemStyle.time}>{time}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

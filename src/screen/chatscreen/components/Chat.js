import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Chat = props => {
  const {name, message, unread, time, avatar, isOnline} = props;

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View>
          <Image
            source={{
              uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
            }}
            style={styles.avatar}
          />
          <View style={styles.dot} />
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.time}>2 phút</Text>
        <Text style={styles.unread}>3</Text>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  time: {
    lineHeight: 22,
    fontSize: 13,
    color: 'grey',
  },
  unread: {
    backgroundColor: '#0CBBF0',
    paddingHorizontal: 6,
    color: 'white',
    alignSelf: 'flex-end',
    borderRadius: 999,
  },
  message: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '400',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  content: {
    marginStart: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

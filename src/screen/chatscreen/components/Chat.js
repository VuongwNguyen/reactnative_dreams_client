import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';

const Chat = props => {
  const {name, message, time, avatar, isOnline} = props;

  const renderImage = () => {
    if (avatar instanceof Array) {
      return (
        <View style={styles.wrapperAvatar}>
          {avatar.map((url, index) => {
            return (
              <Image key={index} source={{uri: url}} style={styles.avatar} />
            );
          })}
        </View>
      );
    }

    return <Image source={{uri: avatar}} style={styles.ava} />;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View>
          {renderImage()}
          {isOnline && <View style={styles.dot} />}
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
      <View>{time && <Text style={styles.time}>{time}</Text>}</View>
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
    flex: 1,
    alignSelf: 'flex-start',
    flexBasis: 25,
    height: 'auto',
    aspectRatio: 1,
  },
  ava: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  wrapperAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 2,
  },
});

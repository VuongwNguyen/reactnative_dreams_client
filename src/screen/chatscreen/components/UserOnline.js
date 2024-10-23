import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const UserOnline = props => {
  const {name, image, status} = props;

  return (
    <View style={styles.wrapper}>
      <View>
        <Image
          source={{
            uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
          }}
          style={styles.avatar}
        />
        <View style={styles.dot} />
      </View>
      <Text numberOfLines={1}>{name}</Text>
    </View>
  );
};

export default UserOnline;

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
  wrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

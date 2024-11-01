import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const UserOnline = props => {
  const {name, image, status, onPressed} = props;

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPressed}>
      <View>
        <Image
          source={{
            uri: image,
          }}
          style={styles.avatar}
        />
        {status && <View style={styles.dot} />}
      </View>
      <Text numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
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

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Group from './Group';

const User = ({name, avatar, onPressed, isOnline, isGroup, members}) => {
  if (isGroup) {
    return <Group name={name} members={members} onPressed={onPressed} />;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPressed}>
      <View>
        {!!isOnline && <View style={styles.dot} />}
        <Image
          source={{
            uri: avatar
              ? avatar
              : 'https://i.pinimg.com/564x/1b/ef/4b/1bef4b7beb3515719443a937685231c6.jpg',
          }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>{name || 'Nguyen Ba Sang'}</Text>
    </TouchableOpacity>
  );
};

export default User;

const styles = StyleSheet.create({
  name: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'green',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 12,
  },
});

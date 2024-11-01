import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Group = ({members, onPressed, name}) => {
  const renderImages = () => {
    return (
      <View style={styles.ava}>
        {members.map(mem => {
          return (
            <Image
              key={mem.account_id._id}
              source={{uri: mem.account_id.avatar.url}}
              style={styles.avatar}
            />
          );
        })}
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressed}>
      {renderImages()}
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Group;

const styles = StyleSheet.create({
  name: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    flexBasis: 25,
    height: 'auto',
    aspectRatio: 1,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
    flex: 1,
  },
  ava: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    gap: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 12,
  },
});

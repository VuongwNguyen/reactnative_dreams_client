import {StyleSheet, View} from 'react-native';
import React from 'react';

const MessageLeft = ({children}) => {
  return <View style={styles.messageLeftContainer}>{children}</View>;
};

export default MessageLeft;

const styles = StyleSheet.create({
  messageLeftContainer: {
    backgroundColor: '#e5e5e5',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    alignSelf: 'flex-start',
  },
});

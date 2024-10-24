import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

const Message = props => {
  const {
    message,
    isMe = false,
    time = '11:00 AM',
    images = [],
    isShowAvatar,
    isNext = false,
    replyMessage,
  } = props;

  if (images.length > 0) {
    return (
      <View style={[styles.imageArea, isMe && styles.imageAreaR]}>
        {Array.from({length: 5}).map((_, index) => {
          return (
            <Image
              key={index}
              source={{
                uri: 'https://i.pinimg.com/736x/25/d5/82/25d5824a93f9c47b8f2b7399aae14851.jpg',
              }}
              style={styles.img}
            />
          );
        })}
      </View>
    );
  }

  return (
    <View style={[styles.container, isMe && styles.containerR]}>
      {/* avatar */}
      {isShowAvatar && (
        <View style={[styles.credential, isMe && styles.credentialR]}>
          {isMe && <Text style={styles.name}>User 1</Text>}
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/25/d5/82/25d5824a93f9c47b8f2b7399aae14851.jpg',
            }}
            style={styles.ava}
          />
          {!isMe && <Text style={styles.name}>User 1</Text>}
        </View>
      )}
      {/* messages */}
      <TouchableOpacity style={[styles.wrapper, isMe && styles.wrapperR]}>
        {!!replyMessage && (
          <View style={styles.originArea}>
            <View
              style={[styles.divider, isMe && {backgroundColor: '#E5E5E5'}]}
            />
            <View>
              <Text style={styles.author}>Auth - 1</Text>
              <Text style={styles.origin}>{replyMessage}</Text>
            </View>
          </View>
        )}
        <Text style={[styles.message, isMe && styles.messageR]}>{message}</Text>
      </TouchableOpacity>

      {/* time stamp */}
      {!isNext && <Text style={styles.time}>{time}</Text>}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    flexBasis: width * 0.8 * 0.3,
    height: 'auto',
    aspectRatio: 1,
    alignSelf: 'flex-start',
    resizeMode: 'cover',
  },
  imageArea: {
    borderRadius: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 5,
    maxWidth: width * 0.8,
  },
  imageAreaR: {
    alignSelf: 'flex-end',
  },
  origin: {
    textAlign: 'justify',
  },
  divider: {
    width: 2,
    alignSelf: 'stretch',
    backgroundColor: '#0CBBF0',
  },
  originArea: {
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
    paddingEnd: 10,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  wrapper: {
    borderRadius: 10,
    borderTopLeftRadius: 0,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: '#E5E5E5',
  },
  wrapperR: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    backgroundColor: '#0CBBF0',
  },
  credentialR: {
    alignSelf: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  credential: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  ava: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 15,
    backgroundColor: 'red',
  },
  container: {
    alignSelf: 'flex-start',
    maxWidth: width * 0.8,
  },
  containerR: {
    alignSelf: 'flex-end',
  },
  message: {
    fontSize: 16,
    color: 'black',
  },
  messageR: {
    color: 'white',
  },
  time: {
    alignSelf: 'flex-end',
  },
});

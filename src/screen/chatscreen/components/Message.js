import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
dayjs.extend(relativeTime);

const customLocale = {
  ...dayjs.Ls.vi,
  relativeTime: {
    ...dayjs.Ls.vi.relativeTime,
    future: 'in %s',
    past: '%s trước',
    s: 'vài giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
};

// Sử dụng locale tùy chỉnh
dayjs.locale(customLocale);

const {width} = Dimensions.get('window');

const Message = props => {
  const {
    message,
    isMe = false,
    time,
    images = [],
    isShowAvatar,
    avatar,
    name,
    isNext = false,
    replyMessage,
    replyPressed,
  } = props;

  const renderImages = () => {
    return (
      <View style={[styles.imageArea, isMe && styles.imageAreaR]}>
        {images.map(item => {
          return (
            <Image
              key={item.public_id}
              source={{
                uri: item.url
                  ? item.url
                  : 'https://i.pinimg.com/736x/25/d5/82/25d5824a93f9c47b8f2b7399aae14851.jpg',
              }}
              style={styles.img}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, isMe && styles.containerR]}>
      {/* avatar */}
      {isShowAvatar && (
        <View style={[styles.credential, isMe && styles.credentialR]}>
          {isMe && <Text style={styles.name}>{name}</Text>}
          <Image
            source={{
              uri: avatar
                ? avatar
                : 'https://i.pinimg.com/736x/25/d5/82/25d5824a93f9c47b8f2b7399aae14851.jpg',
            }}
            style={styles.ava}
          />
          {!isMe && <Text style={styles.name}>{name}</Text>}
        </View>
      )}
      {/* messages */}
      {images?.length > 0 ? (
        renderImages()
      ) : (
        <TouchableOpacity
          style={[styles.wrapper, isMe && styles.wrapperR]}
          onLongPress={replyPressed}>
          {!!replyMessage && (
            <View style={styles.originArea}>
              <View
                style={[styles.divider, isMe && {backgroundColor: '#E5E5E5'}]}
              />
              <View>
                <Text style={styles.author}>
                  {replyMessage?.author?.fullname}
                </Text>
                <Text style={styles.origin}>{replyMessage?.content}</Text>
              </View>
            </View>
          )}
          <Text style={[styles.message, isMe && styles.messageR]}>
            {message}
          </Text>
        </TouchableOpacity>
      )}

      {/* time stamp */}
      {!isNext && time && (
        <Text style={[styles.time, isMe && styles.timeR]}>
          {dayjs(time).locale('vi').fromNow()}
        </Text>
      )}
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
    alignSelf: 'flex-start',
  },
  wrapperR: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    backgroundColor: '#0CBBF0',
    alignSelf: 'flex-end',
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
    alignSelf: 'flex-start',
  },
  timeR: {
    alignSelf: 'flex-end',
  },
});

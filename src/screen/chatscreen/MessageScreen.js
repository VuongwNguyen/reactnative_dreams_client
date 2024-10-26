import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Assets} from '../../styles';
import {Loading, Message} from './components';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PermissionsAndroid, Platform} from 'react-native';
import AxiosInstance from '../../configs/axiosInstance';
import {useSocket} from '../../contexts/SocketContext';

const MessageScreen = props => {
  const {isGroup, participant, roomId} = props.route.params;
  const [initial, setInitial] = useState(false);
  const [room, setRoom] = useState(false);
  const {socket} = useSocket();

  const renderMesssage = ({item, index}) => {
    let images = (index === 2 && [1, 2]) || [];

    return (
      <Message
        images={images}
        message={item.message}
        isMe={item.userId === 1}
        replyMessage={item.replyMessage}
        isShowAvatar={item.isShowAvatar}
        isNext={item.isNext}
      />
    );
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (isGroup) {
    } else {
      AxiosInstance()
        .post('/room/get-room', {
          participant,
        })
        .then(res => {
          setInitial(true);
          setRoom(res.data);
          socket?.emit('join-room', res.data._id);
        })
        .catch(err => console.log('error: ', err));
    }
  }, [isGroup, participant, roomId]);

  useEffect(() => {
    if (!socket) return;

    socket.on('message', () => {});

    return () => {
      console.log('leave');
      socket.emit('leave-room', room._id);
      socket.off('message');
      socket.off('join-room');
      socket.off('leave-room');
    };
  }, [socket]);

  const renderImages = () => {
    return (
      <View style={styles.wrapper}>
        {room?.members?.map(mem => {
          if (!mem.isMe) {
            return (
              <Image
                key={mem.account_id}
                source={{uri: mem.avatar}}
                style={[styles.avatar, {height: 50}]}
              />
            );
          }

          return null;
        })}
      </View>
    );
  };

  if (!initial) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* info */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={Assets.icons.arrowLeft} style={styles.icon} />
          </TouchableOpacity>
          {renderImages()}
          {/* name */}
          <View>
            <Text style={styles.name}>{room.name}</Text>
            <Text style={styles.status}>Active now</Text>
          </View>
        </View>
        {/* call */}
        <View style={styles.row}>
          <TouchableOpacity>
            <Image source={Assets.icons.call} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Assets.icons.video} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Assets.icons.option} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* list */}
      <View style={{flex: 1}}>
        <FlatList
          data={dummyMessages}
          renderItem={renderMesssage}
          inverted
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      </View>

      {/* input */}
      <View style={styles.inputArea}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => hasAndroidPermission()}>
            <Image source={Assets.icons.attach} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(stackName.camera.name)}>
            <Image source={Assets.icons.camera} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperInput}>
          <TextInput placeholder="send message ..." style={styles.input} />
          <TouchableOpacity>
            <Image source={Assets.icons.send} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Gallery picker */}
      {/* <View style={{flex: 1}}>
        <FlatList
          data={list}
          renderItem={({item, index}) => {
            return (
              <Image
                source={{uri: item.node.image.uri}}
                style={{
                  flex: 1 / 3,
                  height: 'auto',
                  aspectRatio: 1,
                  resizeMode: 'cover',
                }}
              />
            );
          }}
          numColumns={3}
        />
      </View> */}
    </View>
  );
};

export default MessageScreen;

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

async function savePicture() {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }

  CameraRoll.save(tag, {type, album});
}

const styles = StyleSheet.create({
  inputArea: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    flexDirection: 'row',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  wrapperInput: {
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    padding: 0,
    flex: 1,
  },
  list: {
    padding: 15,
  },
  status: {
    fontSize: 12,
    color: 'grey',
  },
  name: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#B1B1B1',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    flexBasis: 25,
    flex: 1,
    aspectRatio: 1,
  },
  wrapper: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const dummyMessages = [
  {
    id: 1,
    userId: 1,
    message: 'Hello, long time no see',
    isNext: false,
    isShowAvatar: false,
    time: '11:00 AM',
  },
  {
    id: 2,
    userId: 1,
    message: 'Hi, how are you today?',
    isNext: true,
    isShowAvatar: true,
    time: '11:11 AM',
  },
  {
    id: 3,
    userId: 2,
    message:
      'Hi, I’m good. I’ve been really busy with work lately. How about you?',
    isNext: true,
    isShowAvatar: false,
    time: '12:00 PM',
    replyMessage: 'Hi, how are you today?',
    replyMessageId: 2,
    replyAuthor: 'David',
  },
  {
    id: 4,
    userId: 2,
    message: 'That’s great to hear. What kind of projects are you working on?',
    isNext: false,
    isShowAvatar: true,
    time: '12:10 PM',
  },
  {
    id: 5,
    userId: 1,
    message:
      'I’ve been good as well! Just working on some new projects and keeping myself occupied.',
    isNext: true,
    isShowAvatar: false,
    time: '12:15 PM',
  },
  {
    id: 6,
    userId: 1,
    message:
      'I’m currently working on a mobile app. It’s been a challenging but rewarding experience.',
    isNext: false,
    isShowAvatar: true,
    time: '12:20 PM',
    replyMessage:
      'I’ve been good as well! Just working on some new projects and keeping myself occupied.',
    replyMessageId: 5,
    replyAuthor: 'David',
  },
  {
    id: 7,
    userId: 2,
    message:
      'That sounds amazing! Is it a personal project or something for work?',
    isNext: true,
    isShowAvatar: false,
    time: '12:25 PM',
  },
  {
    id: 8,
    userId: 2,
    message: 'Good for you! Can’t wait to see it when it’s finished!',
    isNext: false,
    isShowAvatar: true,
    time: '12:30 PM',
  },
  {
    id: 9,
    userId: 1,
    message: 'Thanks! I’ll definitely share it with you when it’s done.',
    isNext: true,
    isShowAvatar: false,
    time: '12:35 PM',
  },
  {
    id: 10,
    userId: 1,
    message:
      'It’s been a long journey, but I’m confident the result will be worth it.',
    isNext: false,
    isShowAvatar: true,
    time: '12:40 PM',
  },
];

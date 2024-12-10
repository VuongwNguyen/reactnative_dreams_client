import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Assets, Colors} from '../../styles';
import {Loading, Message, User} from './components';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import {useSocket} from '../../contexts/SocketContext';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGroup, fetchMessages, fetchRoom} from '../../store/api/ChatAPI';
import {newMessage, reset} from '../../store/slices';
import {parseJwt} from '../../utils/token';
import throttle from '../../utils/throttle';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AxiosInstance from '../../configs/axiosInstance';
import {useCallContext} from '../../contexts/CallContext';
import {navigatorRef} from '../../navigations/Navigator';

const {width} = Dimensions.get('window');

const MessageScreen = props => {
  const {isGroup, participant, roomId} = props.route.params;
  const [isOnline, setIsOnline] = useState(false);
  const [mess, setMess] = useState('');
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [replied, setReplied] = useState(null);
  const {token} = useSelector(state => state.account);
  const {registerCall} = useCallContext();
  const {socket} = useSocket();
  const dispatch = useDispatch();
  const {room, initial, messages, page, count, loading} = useSelector(
    state => state.chatMessage,
  );

  const renderMesssage = useCallback(
    ({item}) => {
      return (
        <Message
          images={item.images}
          message={item.content}
          isMe={
            item.isMe !== undefined
              ? item.isMe
              : !!(parseJwt(token.accessToken)?.user_id === item.author._id)
          }
          avatar={item.author.avatar}
          name={item.author.fullname}
          replyMessage={item.replied}
          isShowAvatar={item.showAvatar}
          isNext={item.isNext}
          time={item.send_at}
          replyPressed={() => setReplied(item)}
        />
      );
    },
    [setReplied, messages],
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (isGroup) {
      dispatch(fetchGroup({roomId: roomId}))
        .unwrap()
        .then(res => {
          socket.emit('join-room', res.data._id);
          dispatch(
            fetchMessages({
              roomId: res.data._id,
              timestamp: Date.now(),
              page: 1,
              limit: 20,
            }),
          );
        })
        .catch(err => console.log('[MessageScreen] fetch group failed: ', err));
    } else {
      dispatch(fetchRoom({participant: participant}))
        .unwrap()
        .then(res => {
          socket.emit('get-user-status', participant);
          socket.emit('join-room', res.data._id);
          dispatch(
            fetchMessages({
              roomId: res.data._id,
              timestamp: Date.now(),
              page: 1,
              limit: 20,
            }),
          );
        });
    }
  }, [isGroup, participant, roomId]);

  useEffect(() => {
    if (!socket) return;

    const userId = parseJwt(token.accessToken)?.user_id;

    socket.on('message', message => {
      dispatch(newMessage(message));
    });

    socket.on('participant-status', status => {
      setIsOnline(status);
    });

    socket.on('user-disconnect', info => {
      const {user_id = null} = info;
      setIsOnline(prev => {
        if (user_id === participant) {
          return !prev;
        }
        return prev;
      });
    });

    socket.on('user-online', info => {
      const {user_id = null} = info;
      setIsOnline(prev => {
        if (user_id === participant) {
          return !prev;
        }
        return prev;
      });
    });

    socket.on('remove-member', (roomId, memberId) => {
      if (memberId === userId && room._id === roomId) {
        Alert.alert('Thông báo', 'Bạn đã bị xóa khỏi nhóm chat này', [
          {
            text: 'Thoát',
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
                dispatch(reset());
              }
            },
            style: 'default',
          },
        ]);
      }
    });

    socket.on('delete-room', roomId => {
      if (roomId === room._id) {
        if (userId !== room.host) {
          Alert.alert('Thông báo', 'Nhóm này đã bị giải tán', [
            {
              onPress: () => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
                dispatch(reset());
              },
              text: 'Thoát',
              style: 'default',
            },
          ]);
        }
      }
    });

    return () => {
      socket.off('message');
      socket.off('participant-status');
    };
  }, [socket, token, room]);

  useEffect(() => {
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        socket.emit('leave-room', room?._id);
        dispatch(reset());
      },
    );

    return () => backhandler.remove();
  }, [room]);

  const sendMessage = () => {
    socket.emit('message', {content: mess, replied_id: replied?._id}, room._id);
    setMess('');
    setReplied(null);
  };

  const onEndReached = useCallback(() => {
    if (page.next && page.current <= page.max) {
      dispatch(
        fetchMessages({
          roomId: room._id,
          page: page.current + 1,
          limit: page.limit,
          offset: count,
        }),
      );
    }
  }, [page, count, room, dispatch]);

  const onLoadMessages = useCallback(throttle(onEndReached, 500), [
    onEndReached,
  ]);

  const renderImages = useCallback(() => {
    return (
      <View style={styles.wrapper}>
        {room?.members?.slice(0, 4)?.map(mem => {
          if (!mem.isMe) {
            return (
              <Image
                key={mem.account_id}
                source={{uri: mem.avatar}}
                style={[styles.avatar]}
              />
            );
          }

          return null;
        })}
      </View>
    );
  }, [messages]);

  const handleChooseImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 10,
      });

      if (result.didCancel) {
        return;
      }

      setImages(result?.assets || []);
    } catch (e) {
      console.log('[MessageScreen] choose images error: ', e);
    }
  };

  const handleUploadImages = async () => {
    setUploadStatus(true);
    const data = new FormData();

    images.forEach(image => {
      data.append('images', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    });

    try {
      const res = await AxiosInstance('multipart/form-data').post(
        '/message/upload-images',
        data,
      );

      socket.emit('message', {images: res.data}, room._id);
      setUploadStatus(false);
      setImages([]);
      ToastAndroid.show('Gửi ảnh thành công', 300);
    } catch (e) {
      setUploadStatus(false);
      console.log('[MessageScreen] upload images failed: ', e);
      ToastAndroid.show('Gửi ảnh thất bại, hãy thử lại sau', 300);
    }
  };

  const handleTakeImage = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
      });

      if (result.didCancel) {
        return;
      }

      setImages(result?.assets || []);
    } catch (e) {
      console.log('[MessageScreen] error when take picture: ', e);
    }
  };

  if (!initial) {
    return <Loading />;
  }

  const createAudioCall = () => {
    registerCall(
      room.members.map(mem => ({user_id: mem.account_id})),
      0,
    ).catch(err =>
      console.log('[MessageScreen] create call audio error: ', err),
    );
  };

  const createVideoCall = () => {
    registerCall(
      room.members.map(mem => ({user_id: mem.account_id})),
      1,
    ).catch(err =>
      console.log('[MessageScreen] create call video error: ', err),
    );
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* info */}
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              socket.emit('leave-room', room?._id);
              dispatch(reset());
              navigation.goBack();
            }}>
            <Image source={Assets.icons.arrowLeft} style={styles.icon} />
          </TouchableOpacity>
          {renderImages()}
          {/* name */}
          <View>
            <Text style={styles.name} numberOfLines={2}>
              {room?.name}
            </Text>
            {!isGroup && (
              <Text style={[styles.status, isOnline && styles.online]}>
                {!isOnline ? 'Không trực tuyến' : 'Trực tuyến'}
              </Text>
            )}
          </View>
        </View>
        {/* call */}
        <View style={styles.row}>
          <TouchableOpacity onPress={createAudioCall}>
            <Image source={Assets.icons.call} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={createVideoCall}>
            <Image source={Assets.icons.video} style={styles.icon} />
          </TouchableOpacity>
          {isGroup && (
            <TouchableOpacity
              onPress={() => navigation.navigate(stackName.settingGroup)}>
              <Image source={Assets.icons.edit} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* list */}
      <View style={{flex: 1}}>
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            renderItem={renderMesssage}
            inverted
            keyExtractor={item => item._id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            onEndReachedThreshold={0.5}
            onEndReached={onLoadMessages}
            ListFooterComponent={() => {
              return (
                <View style={styles.center}>
                  {!page.next ? (
                    <Text>Hết</Text>
                  ) : (
                    loading && <ActivityIndicator size={20} color={'black'} />
                  )}
                </View>
              );
            }}
          />
        ) : (
          <View style={styles.center}>
            <Text>Chưa có tin nhắn nào</Text>
          </View>
        )}
      </View>

      {/* replied */}
      {replied && (
        <View style={styles.row}>
          <View style={styles.replied}>
            <Text style={styles.name}>
              {'Trả lời' + ' ' + replied.author.fullname}
            </Text>
            <Text style={styles.common}>{replied.content}</Text>
          </View>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => setReplied(null)}>
            <Text>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* input */}
      <View style={styles.inputArea}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleChooseImages}>
            <Image source={Assets.icons.attach} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakeImage}>
            <Image source={Assets.icons.camera} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperInput}>
          <TextInput
            placeholder="send message ..."
            style={styles.input}
            onChangeText={setMess}
            value={mess}
          />
          {!!mess && (
            <TouchableOpacity onPress={sendMessage}>
              <Image source={Assets.icons.send} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* preview images */}
      {images.length > 0 && (
        <>
          <View style={styles.preview}>
            {images.map(elem => {
              return (
                <View style={styles.wrap} key={elem.originalPath}>
                  <TouchableOpacity
                    style={styles.close}
                    onPress={() =>
                      setImages(
                        images.filter(
                          item => item.originalPath !== elem.originalPath,
                        ),
                      )
                    }>
                    <Image
                      source={Assets.icons.close}
                      style={styles.tinyIcon}
                    />
                  </TouchableOpacity>
                  <Image source={{uri: elem.uri}} style={styles.previewImage} />
                </View>
              );
            })}
          </View>
          <View style={[styles.row, {padding: 10}]}>
            {!uploadStatus ? (
              <>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: 'gray'}]}
                  onPress={() => setImages([])}>
                  <Text style={styles.textButton}>hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUploadImages}>
                  <Text style={styles.textButton}>Gửi {images.length} ảnh</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.center}>
                <ActivityIndicator size={20} color={Colors.primary} />
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  tinyIcon: {
    width: 15,
    height: 15,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  wrap: {
    width: width / 5,
    height: 'auto',
    aspectRatio: 1,
    padding: 5,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  preview: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    gap: 20,
  },
  cancel: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
  },
  replied: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#B1B1B1',
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  online: {
    color: 'green',
  },
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
    color: 'red',
  },
  name: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    maxWidth: '85%',
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
    flexBasis: 20,
    flex: 1,
    alignSelf: 'flex-start',
    height: 'auto',
    aspectRatio: 1,
  },
  wrapper: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
});

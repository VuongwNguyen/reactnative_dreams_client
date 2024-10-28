import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Assets} from '../../styles';
import {Loading, Message} from './components';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import {useSocket} from '../../contexts/SocketContext';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMessages, fetchRoom} from '../../store/api/ChatAPI';
import {newMessage, reset} from '../../store/slices';
import {parseJwt} from '../../utils/token';
import throttle from '../../utils/throttle';

const MessageScreen = props => {
  const {isGroup, participant, roomId} = props.route.params;
  const [isOnline, setIsOnline] = useState(false);
  const [mess, setMess] = useState('');
  const {socket} = useSocket();
  const dispatch = useDispatch();
  const {room, initial, messages, page, count, loading} = useSelector(
    state => state.chatMessage,
  );
  const {token} = useSelector(state => state.account);
  const [replied, setReplied] = useState(null);

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
    [setReplied],
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (isGroup) {
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

    return () => {
      socket.off('message');
      socket.off('user-disconnect');
      socket.off('participant-status');
      socket.off('user-online');
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit('message', {content: mess, replied_id: replied?._id}, room._id);
    setMess('');
    setReplied(null);
  };

  const onEndReached = useCallback(() => {
    console.log(page.next, page.current, page.max);
    if (page.next && page.current <= page.max) {
      dispatch(
        fetchMessages({
          roomId: room._id,
          page: page.current + 1,
          limit: 20,
          offset: count,
        }),
      );
    }
  }, [page, count, room, dispatch]);

  const onRefresh = useCallback(throttle(onEndReached, 300), [onEndReached]);

  const renderImages = () => {
    return (
      <View style={styles.wrapper}>
        {room?.members?.map(mem => {
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
            <Text style={styles.name}>{room?.name}</Text>
            {!isGroup && (
              <Text style={[styles.status, isOnline && styles.online]}>
                {!isOnline ? 'Offline' : 'Active now'}
              </Text>
            )}
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
            onEndReached={onRefresh}
            ListFooterComponent={() => {
              !page.next ? (
                <View style={styles.center}>
                  <Text>Hết</Text>
                </View>
              ) : (
                loading && (
                  <View style={styles.center}>
                    <ActivityIndicator size={20} color={'black'} />
                  </View>
                )
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
          <TouchableOpacity>
            <Image source={Assets.icons.attach} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(stackName.camera.name)}>
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
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
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
  },
});

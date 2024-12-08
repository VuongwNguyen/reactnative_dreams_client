import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Chat} from './components';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMessages, fetchListRooms} from '../../store/api/ChatAPI';
import dayjs from 'dayjs';

const TabChatScreen = () => {
  const navigation = useNavigation();
  const {list, page} = useSelector(state => state.chatRoom);
  const dispatch = useDispatch();

  const renderChat = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(stackName.conversation.name, {
              isGroup: item.is_group,
              participant: !item.is_group
                ? item.members[0].isMe
                  ? item.members[1]._id
                  : item.members[0]._id
                : null,
              roomId: item._id,
            })
          }
          onLongPress={() => {
            Alert.alert(
              `Xóa đoạn chat với ${item.name}`,
              'Các tin nhắn cũ sẽ không còn được hiển thị lại',
              [
                {
                  text: 'Hủy',
                  style: 'cancel',
                },
                {
                  text: 'Đồng ý',
                  onPress: () =>
                    dispatch(deleteMessages(item._id))
                      .unwrap()
                      .then(() => ToastAndroid.show('Xóa thành công', 300))
                      .catch(() => ToastAndroid.show('Xóa thất bại', 300)),
                },
              ],
            );
          }}>
          <Chat
            name={item.name}
            message={
              item.message
                ? `${item.message.author.fullname}: ${
                    item.message.images.length > 0
                      ? `đã gửi ${item.message.images.length} ảnh`
                      : item.message.content
                  }`
                : 'Chưa có tin nhắn nào'
            }
            avatar={
              item.is_group
                ? item.members.slice(0, 4).map(mem => mem.avatar)
                : item.members[0].isMe
                ? item.members[1].avatar
                : item.members[0].avatar
            }
            isOnline={false}
            time={
              item.message
                ? dayjs(item.message.send_at).locale('vi').fromNow()
                : null
            }
          />
        </TouchableOpacity>
      );
    },
    [list],
  );

  useEffect(() => {
    dispatch(fetchListRooms({}));
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {list.length > 0 ? (
          <FlatList
            data={list}
            renderItem={renderChat}
            ItemSeparatorComponent={() => <View style={{height: 20}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />
        ) : (
          <View style={styles.center}>
            <Text>Chat room is empty</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TabChatScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

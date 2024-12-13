import {
  ActivityIndicator,
  Alert,
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
import React, {useState} from 'react';
import {Assets, Colors} from '../../styles';
import {navigatorRef} from '../../navigations/Navigator';
import {useSelector} from 'react-redux';
import {parseJwt} from '../../utils/token';
import AxiosInstance from '../../configs/axiosInstance';
import {stackName} from '../../navigations/screens';

const {width} = Dimensions.get('window');

const UserTile = ({
  ava,
  name,
  onDelete,
  isHost = false,
  isMe = false,
  allowKickMember = false,
}) => {
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      <View style={styles.row}>
        <Image source={{uri: ava}} style={styles.avatar} />
        <View>
          <Text style={styles.name}>
            {name} {isMe && ' (Tôi)'}
          </Text>
          {isHost && <Text style={{color: Colors.primary}}>Trưởng nhóm</Text>}
        </View>
      </View>

      {allowKickMember && !isHost && (
        <TouchableOpacity style={[styles.btn, {flex: 0}]} onPress={onDelete}>
          <Text style={styles.textBtn}>Xóa khỏi nhóm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const SettingGroup = () => {
  const {room} = useSelector(state => state.chatMessage);
  const {
    token: {accessToken},
  } = useSelector(state => state.account);

  const [isShowDialog, setIsShowDialog] = useState(false);
  const [name, setName] = useState(room.name);
  const [loading, setLoading] = useState(false);

  const me = parseJwt(accessToken)?.user_id;

  const handleRename = async () => {
    if (name.length < 5) {
      return ToastAndroid.show('Tên phải lớn hơn 5 ký tự', 1000);
    }

    setLoading(true);
    AxiosInstance()
      .post('/room/update-name', {
        room_id: room._id,
        name,
      })
      .then(() => {
        ToastAndroid.show('Đổi tên thành công', 1000);
        setIsShowDialog(false);
      })
      .catch(() => ToastAndroid.show('Đổi tên thất bại', 1000))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (navigatorRef.current.isReady()) navigatorRef.current.goBack();
          }}>
          <Image source={Assets.icons.arrowLeft} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.grName}>{room?.name}</Text>
      </View>

      <View style={[styles.container, {padding: 0}]}>
        <FlatList
          data={room.members}
          renderItem={({item}) => {
            return (
              <View>
                <UserTile
                  ava={item.avatar}
                  name={item.fullname}
                  isHost={item.account_id === room.host}
                  isMe={me === item.account_id}
                  allowKickMember={me === room.host}
                  onDelete={() => {
                    const isDeleteRoom = room.members.length <= 3;

                    Alert.alert(
                      `Xóa thành viên`,
                      isDeleteRoom
                        ? 'Nhóm chỉ còn dưới 3 thành viên, bạn có muốn xóa nhóm ?'
                        : `Bạn có chắc muốn xóa ${item.fullname} khỏi nhóm?`,
                      [
                        {
                          text: 'Không',
                          style: 'cancel',
                        },
                        {
                          text: `Có`,
                          style: 'default',
                          onPress: () => {
                            if (isDeleteRoom) {
                              AxiosInstance()
                                .post('/room/delete-room', {
                                  room_id: room._id,
                                })
                                .then(() => {
                                  ToastAndroid.show('Xóa thành công', 1000);
                                  navigatorRef.current.reset({
                                    index: 0,
                                    routes: [{name: stackName.bottomTab.name}],
                                  });
                                })
                                .catch(() =>
                                  ToastAndroid.show(
                                    'Xóa thất bại. Thử lại sau!',
                                    1000,
                                  ),
                                );
                            } else {
                              AxiosInstance()
                                .post('/room/delete-user', {
                                  room_id: room._id,
                                  user_id: item.account_id,
                                })
                                .then(() =>
                                  ToastAndroid.show(
                                    `Xóa thành viên ${item.fullname} thành công`,
                                    1000,
                                  ),
                                )
                                .catch(() => {
                                  ToastAndroid.show('Xóa thất bại', 1000);
                                });
                            }
                          },
                        },
                      ],
                    );
                  }}
                />
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View>
              <View style={{height: 10}} />
              <View style={{height: 1, flex: 1, backgroundColor: 'grey'}} />
              <View style={{height: 10}} />
            </View>
          )}
        />
      </View>

      <View style={styles.row}>
        {me === room.host && (
          <TouchableOpacity
            onPress={() => setIsShowDialog(true)}
            style={styles.btn}>
            <Text style={styles.textBtn}>Sửa tên nhóm</Text>
          </TouchableOpacity>
        )}
        {me === room.host && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Alert.alert(
                'Cảnh báo',
                'Bạn có chắc chắn muốn giải tán nhóm này.',
                [
                  {
                    style: 'cancel',
                    text: 'Hủy',
                  },
                  {
                    style: 'default',
                    text: 'Đồng ý',
                    onPress: () => {
                      AxiosInstance()
                        .post('/room/delete-room', {
                          room_id: room._id,
                        })
                        .then(() => {
                          ToastAndroid.show('Xóa thành công', 1000);
                          navigatorRef.current.reset({
                            index: 0,
                            routes: [{name: stackName.bottomTab.name}],
                          });
                        })
                        .catch(() =>
                          ToastAndroid.show('Xóa thất bại. Thử lại sau!', 1000),
                        );
                    },
                  },
                ],
              );
            }}>
            <Text style={styles.textBtn}>Xóa nhóm</Text>
          </TouchableOpacity>
        )}
      </View>
      {isShowDialog && (
        <InputDialog
          loading={loading}
          onCancel={() => setIsShowDialog(false)}
          onComplete={handleRename}
          input={name}
          onChangeText={text => setName(text)}
        />
      )}
    </View>
  );
};

const InputDialog = ({
  onCancel,
  onComplete,
  onChangeText,
  input,
  loading = false,
}) => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(159, 155, 157, 0.3)',
      }}>
      <View style={{backgroundColor: 'white', padding: 20, gap: 20}}>
        <View style={styles.input}>
          <TextInput
            style={styles.padding}
            placeholder="nhập tên nhóm"
            onChangeText={onChangeText}
            value={input}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onCancel}
            style={[
              styles.btn,
              {
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: 'white',
              },
            ]}>
            <Text style={[styles.textBtn, {color: 'black'}]}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onComplete}
            style={[styles.btn, {borderWidth: 1}]}>
            {loading ? (
              <ActivityIndicator color={'white'} size={'small'} />
            ) : (
              <Text style={styles.textBtn}>Đổi tên</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingGroup;

const styles = StyleSheet.create({
  dot: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
  },
  dotSelected: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  padding: {
    padding: 0,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: width * 0.6,
  },
  dialog: {
    width: width * 0.8,
    height: 'auto',
    aspectRatio: 1,
    backgroundColor: 'red',
  },
  name: {
    color: 'black',
    fontSize: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  row: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  btn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
  },
  grName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    gap: 20,
  },
});

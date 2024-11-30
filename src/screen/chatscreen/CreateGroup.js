import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AxiosInstance from '../../configs/axiosInstance';
import {stackName} from '../../navigations/screens';
import {Assets, Colors} from '../../styles';
import {SearchDialog, User} from './components';

const CreateGroup = () => {
  const [name, setName] = useState('');
  const {list} = useSelector(state => state.chatUser);
  const [members, setMembers] = useState([]);
  const [listSearch, setListSearch] = useState(list);
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const renderItem = ({item}) => {
    const cloneMembers = members.filter(mem => mem._id !== item._id);

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (cloneMembers.length === members.length) {
            members.push(item);
            setMembers([...members]);
          } else {
            setMembers(cloneMembers);
          }
        }}>
        <User isGroup={false} avatar={item.avatar} name={item.fullname} />

        <View
          style={[
            styles.check,
            cloneMembers.length !== members.length && styles.checked,
          ]}
        />
      </TouchableOpacity>
    );
  };

  const handleCreateGroup = () => {
    if (members.length < 2) {
      ToastAndroid.show('Nhóm phải có 3 người trở lên', 300);
      return;
    }

    setLoading(true);
    AxiosInstance()
      .post('/room', {
        name: name,
        members: members.map(mem => mem._id),
      })
      .then(res => {
        navigation.dispatch(
          StackActions.replace(stackName.conversation.name, {
            isGroup: true,
            roomId: res.data._id,
          }),
        );
      })
      .catch(err => ToastAndroid.show('Lỗi tạo nhóm, thử lại sau', 500))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) navigation.goBack();
              }}>
              <Image source={Assets.icons.arrowLeft} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.label}>Tạo nhóm mới</Text>
          </View>
          <TouchableOpacity
            disabled={loading}
            style={styles.button}
            onPress={handleCreateGroup}>
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={styles.textButton}>Tạo</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên nhóm"
          />
        </View>

        <TouchableOpacity
          style={[styles.wrapperInput, styles.searchInput]}
          onPress={() => setShowSearch(true)}>
          <Image source={Assets.icons.search} style={styles.searchIcon} />
          <Text style={styles.input}>Tìm kiếm</Text>
        </TouchableOpacity>

        <View style={styles.selected}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {members.map(mem => {
              return (
                <View style={styles.selectedUser} key={mem._id}>
                  <TouchableOpacity
                    style={styles.wrapperDot}
                    onPress={() => {
                      setMembers(
                        members.filter(member => member._id !== mem._id),
                      );
                    }}>
                    <Image source={Assets.icons.close} style={styles.dot} />
                  </TouchableOpacity>
                  <Image source={{uri: mem.avatar}} style={styles.avatar} />
                  <Text numberOfLines={1}>{mem.fullname}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <Text style={{marginVertical: 20}}>Đề Xuất</Text>

        <FlatList
          data={listSearch}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {showSearch && (
        <SearchDialog
          initialList={listSearch}
          onClosed={() => setShowSearch(false)}
          onChoose={item => {
            const cloneMembers = members.filter(mem => mem._id !== item._id);

            if (cloneMembers.length !== members.length) {
              setMembers(cloneMembers);
            } else {
              members.push(item);
              setMembers([...members]);
            }

            setShowSearch(false);
          }}
          members={members}
        />
      )}
    </>
  );
};

export default CreateGroup;

export const styles = StyleSheet.create({
  wrapperDot: {
    zIndex: 100,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  searchInput: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  selectedUser: {
    marginHorizontal: 12,
    alignItems: 'center',
    maxWidth: 80,
  },
  selected: {
    marginTop: 15,
  },
  checked: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  check: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingVertical: 12,
  },
  wrapperInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
  },
  label: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 35,
  },
  header: {
    paddingHorizontal: 13,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

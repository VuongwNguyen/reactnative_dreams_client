import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Assets} from '../../styles';
import {useNavigation} from '@react-navigation/native';
import {Chip, Group, User} from './components';
import {useSelector} from 'react-redux';
import {stackName} from '../../navigations/screens';
import {debounce} from '../../utils/throttle';
import AxiosInstance from '../../configs/axiosInstance';

const types = ['Mọi người', 'Nhóm'];

const ChatSearch = () => {
  const navigation = useNavigation();
  const {list} = useSelector(state => state.chatUser);
  const [page, setPage] = useState({});
  const [listSearch, setListSearch] = useState(list);
  const [type, setType] = useState(types[0]);
  const [input, setInput] = useState('');

  const fetchData = (keyword = '') => {
    if (keyword.length === 0 && type !== types[1]) {
      return;
    }

    AxiosInstance()
      .get('/room/search', {
        params: {
          keyword: keyword,
          is_group: type === types[0] ? 0 : 1,
          _limit: 1000,
        },
      })
      .then(res => {
        setPage(res.data.page);
        setListSearch(res.data.list);
      })
      .catch(err => ToastAndroid.show('Lỗi tìm kiếm', 300));
  };

  const fetch = useCallback(debounce(fetchData, 500), [type]);

  useEffect(() => {
    fetchData(input);
  }, [type]);

  useEffect(() => {
    if (input.length === 0 && type === types[0]) {
      setListSearch(list);
    }
  }, [listSearch, input, list, type]);

  const renderItem = ({item}) => {
    const is_group = item.is_group;

    return (
      <User
        isGroup={is_group}
        name={is_group ? item.name : item.fullname}
        avatar={item.avatar}
        isOnline={item.isOnline}
        onPressed={() => {
          navigation.navigate(stackName.conversation.name, {
            isGroup: is_group,
            participant: item._id,
            roomId: item._id,
          });
        }}
        members={item?.members || []}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) navigation.goBack();
          }}>
          <Image source={Assets.icons.arrowLeft} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.textinput}>
          <TextInput
            style={styles.input}
            placeholder="nhập tên ..."
            value={input}
            onChangeText={text => {
              setInput(text);
              fetch(text);
            }}
          />
          <TouchableOpacity>
            <Image source={Assets.icons.search} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.type}>
        {types.map(ele => {
          return (
            <Chip
              key={ele}
              isSelected={ele === type}
              onPressed={() => setType(ele)}
              title={ele}
            />
          );
        })}
      </View>

      <View style={styles.container}>
        {listSearch.length > 0 ? (
          <FlatList
            data={listSearch}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.center}>
            <Text>Không tìm thấy kết quả</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatSearch;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  type: {
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    marginVertical: 12,
    marginStart: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  icon: {
    width: 24,
    height: 24,
  },
  textinput: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

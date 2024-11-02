import {
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
import React, {memo, useCallback, useEffect, useState} from 'react';
import {debounce} from '../../../utils/throttle';
import {Axios} from 'axios';
import AxiosInstance from '../../../configs/axiosInstance';
import {styles as styled} from '../CreateGroup';
import {Assets} from '../../../styles';
import User from './User';

const {width, height} = Dimensions.get('window');

const SearchDialog = ({onClosed, onChoose, initialList = [], members = []}) => {
  const [list, setList] = useState(initialList);
  const [search, setSearch] = useState('');

  const onSearchUser = text => {
    AxiosInstance()
      .get('/room/search', {
        params: {
          keyword: text,
          is_group: 0,
          _limit: 1000,
        },
      })
      .then(res => {
        setList(res.data.list);
      })
      .catch(err => ToastAndroid.show('Lỗi tìm kiếm', 500));
  };

  const fetch = useCallback(debounce(onSearchUser, 500), []);

  useEffect(() => {
    if (search.length === 0) {
      setList(initialList);
    } else {
      fetch(search);
    }
  }, [search]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styled.item}
        onPress={() => {
          onChoose(item);
        }}>
        <User isGroup={false} avatar={item.avatar} name={item.fullname} />

        <View
          style={[
            styled.check,
            members.some(mem => mem._id === item._id) && styled.checked,
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClosed}>
          <Text style={styles.button}>Đóng</Text>
        </TouchableOpacity>

        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên ..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <View style={styles.wrapper}>
        {list.length > 0 ? (
          <FlatList
            data={list}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 20}}
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

export default memo(SearchDialog);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperInput: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'black',
    flex: 1,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 13,
  },
  container: {
    ...StyleSheet.absoluteFill,
    position: 'absolute',
    backgroundColor: 'white',
  },
});

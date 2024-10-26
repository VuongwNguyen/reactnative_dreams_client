import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Assets} from '../../styles';
import {UserOnline} from './components';
import {useSocket} from '../../contexts/SocketContext';
import AxiosInstance from '../../configs/axiosInstance';
import TabChatScreen from './TabChatScreen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFollowingUsers, fetchListRooms} from '../../store/api/ChatAPI';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';

const {width, height} = Dimensions.get('window');

const ChatScreen = () => {
  const {socket} = useSocket();
  const dispatch = useDispatch();
  const {list} = useSelector(state => state.chatUser);
  const navigation = useNavigation();

  const renderUsersOnline = ({item, index}) => {
    return (
      <UserOnline
        name={item.fullname}
        image={item.avatar}
        status={item.isOnline}
        onPressed={() => {
          navigation.navigate(stackName.conversation.name, {
            isGroup: false,
            participant: item._id,
          });
        }}
      />
    );
  };

  useEffect(() => {
    dispatch(fetchFollowingUsers({}));
  }, []);

  return (
    <View style={styles.container}>
      {/* container */}
      {/* Header */}
      <View style={styles.header}>
        <Image source={{uri: mock_image}} style={styles.avatar} />
        <Text style={styles.label}>CHATS</Text>
        <TouchableOpacity>
          <Image source={Assets.icons.add} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/* Search */}
      <TouchableOpacity
        style={styles.search}
        onPress={() => {
          dispatch(fetchFollowingUsers());
        }}>
        <Image source={Assets.icons.search} style={styles.searchIcon} />
        <Text>Search ...</Text>
      </TouchableOpacity>

      {/* users online */}
      <View>
        {list.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.user}
            data={list}
            renderItem={renderUsersOnline}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}} />}
          />
        ) : (
          <View style={styles.center}>
            <Text style={styles.empty}>
              Currently there are no online followers
            </Text>
          </View>
        )}
      </View>

      {/* tab bar */}
      <TabChatScreen />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  user: {
    marginTop: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  search: {
    marginTop: 32,
    marginHorizontal: 29,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6C757D',
    borderRadius: 30,
    alignItems: 'center',
  },
  input: {
    padding: 0,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginEnd: 14,
  },
  label: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    position: 'absolute',
    width: width,
    textAlign: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

const mock_image =
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg';

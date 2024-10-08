import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import TopBarNavigationChat from '../../navigations/TopBarNavigationChat';
import {Assets} from '../../styles';

const ChatScreen = () => {
  return (
    <View style={styles.containerScreen}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
            }}
          />
          <Text style={styles.title}>CHATS</Text>
          <Pressable style={styles.buttonCreateGroupChat}>
            <Image
              source={Assets.icons.follow}
              style={{height: 20, width: 20}}
            />
          </Pressable>
        </View>
        <View style={{height: 20}} />
        <View style={styles.wraperTextInputSearch}>
          <TextInput style={styles.textInputSearch} placeholder="Search..." />
          <Image source={Assets.icons.search} style={[{height: 20, width: 20},styles.iconSearch]} />
        </View>
        <View style={{height: 15}} />
        <ScrollView
          style={{marginLeft: 20}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {dataUser.map((user, index) => (
            <Pressable
              key={index}
              style={{
                flexDirection: 'column',
                marginRight: 15,
                alignItems: 'center',
                gap: 5,
              }}>
              <Image style={styles.avatarUser} source={{uri: user.avatar}} />
              <Text style={{fontSize: 16, color: 'black'}}>{user.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={{height: 10}} />
        <TopBarNavigationChat />
      </ScrollView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
  },
  buttonCreateGroupChat: {
    width: 30,
    height: 30,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0cbbf0',
  },
  wraperTextInputSearch: {
    width: '100%',
    paddingHorizontal: 35,
  },
  textInputSearch: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: '#6c757d',
    fontSize: 16,
    color: 'black',
  },
  iconSearch: {
    position: 'absolute',
    left: 45,
    top: 8,
  },
  avatarUser: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
});

const dataUser = [
  {
    id: 1,
    name: 'User 1',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 2,
    name: 'User 2',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 4,
    name: 'User 3',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 5,
    name: 'User 4',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 6,
    name: 'User 5',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 7,
    name: 'User 6',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
];

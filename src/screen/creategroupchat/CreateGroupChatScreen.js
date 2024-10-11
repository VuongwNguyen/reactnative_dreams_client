import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Assets} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';
import {createGroupChatStyle} from '../../styles/creategroupchatstyle/CreateGroupChatStyle';
import {useTranslation} from 'react-i18next';
import AppHeader from '../../components/Header';

const CreateGroupChatScreen = () => {
  const {t} = useTranslation();
  const inputSearchRef = useRef(null);
  const [createGroupChat, setCreateGroupChat] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxPress = user => {
    const isSelected = selectedUsers.includes(user.id);

    if (isSelected) {
      // Nếu đã chọn, thì bỏ chọn và xóa khỏi mảng createGroupChat
      setSelectedUsers(selectedUsers.filter(id => id !== user.id));
      setCreateGroupChat(createGroupChat.filter(item => item.id !== user.id));
    } else {
      // Nếu chưa chọn, thì thêm vào mảng createGroupChat
      setSelectedUsers([...selectedUsers, user.id]);
      setCreateGroupChat([...createGroupChat, user]);
    }
  };
  const handleDeleteUser = user => {
    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
    setCreateGroupChat(createGroupChat.filter(item => item.id !== user.id));
  };

  return (
    <View style={createGroupChatStyle.container}>
      <AppHeader title={t('createGroupScreen.newgroup')} leftButton={true} />
      <View style={createGroupChatStyle.wraperInput}>
        <TextInput
          style={createGroupChatStyle.textInput}
          placeholder={t('createGroupScreen.groupname')}
        />
      </View>
      <View style={{height: 10}} />
      <View style={createGroupChatStyle.inputSearchContainer}>
        <View style={createGroupChatStyle.wraperInputSearch}>
          <TextInput
            style={createGroupChatStyle.textInputSearch}
            ref={inputSearchRef}
            placeholder={t('createGroupScreen.search')}
          />
          <Pressable
            style={createGroupChatStyle.iconSearch}
            onPress={() => inputSearchRef.current.focus()}>
            <Image
              source={Assets.icons.search}
              style={{height: 20, width: 20}}
            />
          </Pressable>
        </View>
      </View>
      <View style={{height: 20}} />
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={createGroupChatStyle.listCreateContainer}>
            {createGroupChat.map((user, index) => (
              <Pressable key={index}>
                <View style={createGroupChatStyle.itemContainer}>
                  <View style={createGroupChatStyle.avatarContainer}>
                    <Image
                      source={{uri: user.avatar}}
                      style={createGroupChatStyle.avatarItem}
                    />
                    <Pressable
                      onPress={() => handleDeleteUser(user)}
                      style={createGroupChatStyle.buttonCross}>
                      <Image source={Assets.icons.close} style={{width: 15, height: 15}} />
                    </Pressable>
                  </View>
                  <Text style={createGroupChatStyle.name}>{user.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{height: 10}} />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <Text style={createGroupChatStyle.textSuggest}>
          {'\t'}
          {t('createGroupScreen.suggest')}
        </Text>
        <View style={{height: 10}} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{gap: 15}}>
            {fakeDateUser.map((user, index) => (
              <View
                key={index}
                style={createGroupChatStyle.itemContainerSuggest}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Image
                    source={{uri: user.avatar}}
                    style={createGroupChatStyle.avatarItem}
                  />
                  <Text style={createGroupChatStyle.textName}>{user.name}</Text>
                </View>
                <Pressable
                  onPress={() => handleCheckboxPress(user)}
                  style={[
                    createGroupChatStyle.checkbox,
                    {
                      borderWidth: selectedUsers.includes(user.id) ? 0 : 1,
                      backgroundColor: selectedUsers.includes(user.id)
                        ? '#0cbbf0'
                        : '#fff',
                    },
                  ]}>
                  {selectedUsers.includes(user.id) && (
                    <Image source={Assets.icons.check} style={{width: 15, height: 15}} />
                  )}
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateGroupChatScreen;

const fakeDateUser = [
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
    id: 3,
    name: 'User 3',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 4,
    name: 'User 4',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 5,
    name: 'User 5',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 6,
    name: 'User 6',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 7,
    name: 'User 7',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 8,
    name: 'User 8',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
  {
    id: 9,
    name: 'User 9',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
  },
];

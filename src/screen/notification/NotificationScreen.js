import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {notificationStyle} from '../../styles/notification/NotificationStyle';
import AppHeader from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {Assets} from '../../styles';
import NotificationItem from './NotificationItem';

const NotificationScreen = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  const goBackScreen = () => {
    navigation.goBack();
  };
  const optionsArr = ['All', 'New'];
  const [isSelected, setIsSelected] = useState(optionsArr[0]);

  return (
    <ScrollView
      style={notificationStyle.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={notificationStyle.container}>
        <View style={notificationStyle.headerContainer}>
          <AppHeader
            title={t('notificationScreen.title')}
            goBack={goBackScreen}
          />
        </View>
      </View>
      <View>
        <View style={notificationStyle.tagContainer}>
          {optionsArr.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={
                item == isSelected
                  ? notificationStyle.tagSelected
                  : notificationStyle.tagUnSelected
              }
              onPress={() => {
                setIsSelected(item);
              }}>
              <Text
                style={
                  item == isSelected
                    ? notificationStyle.tagLabelSelected
                    : notificationStyle.tagLabelUnSelected
                }>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {renderNewNotifications()}
        {renderOldNotifications()}
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;

const newNotifications = [
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'followed you',
    time: '2h',
    type: 'request',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'liked your post',
    time: '2h',
    type: 'engagement',
  },
];
const oldNotifications = [
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'shared you post',
    time: '2h',
    type: 'engagement',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'mentioned you in a comment',
    time: '2h',
    type: 'engagement',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'mentioned you in a comment',
    time: '2h',
    type: 'engagement',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'mentioned you in a comment',
    time: '2h',
    type: 'engagement',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'shared you post',
    time: '2h',
    type: 'engagement',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'mentioned you in a comment mentioned you in a comment',
    time: '2h',
    type: 'engagement',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'mentioned you in a comment',
    time: '2h',
    type: 'engagement',
  },
  {
    object: {
      avt: Assets.image.avt,
      name: 'Object_name',
    },
    content: 'mentioned you in a comment',
    time: '2h',
    type: 'engagement',
  },
];

const renderNewNotifications = () => {
  return (
    <View>
      {newNotifications.map((item, index) => (
        <NotificationItem
          key={index}
          avt={item.object.avt}
          username={item.object.name}
          content={item.content}
          time={item.time}
          type={item.type}
          isNew={true}
        />
      ))}
    </View>
  );
};
const renderOldNotifications = () => {
  return (
    <View>
      {oldNotifications.map((item, index) => (
        <NotificationItem
          key={index}
          avt={item.object.avt}
          username={item.object.name}
          content={item.content}
          time={item.time}
          type={item.time}
        />
      ))}
    </View>
  );
};

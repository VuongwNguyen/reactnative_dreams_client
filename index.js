/**
 * @format
 */

import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/lang';
import {Colors} from './src/styles';

async function onMessageReceived(message) {
  console.log(message);
  const {type = null} = message?.data;

  if (type === 'message') {
    const {chat, name, main_message, unique_id, info} = message?.data;

    const messages = JSON.parse(chat);
    const informations = JSON.parse(info);

    const user_id = await AsyncStorage.getItem('credential');

    const channelId = await notifee.createChannel({
      id: 'Chat',
      name: 'Chat notification',
      lights: false,
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      id: unique_id,
      title: `Tin nhắn từ: ${name}`,
      body: `<b>${
        messages?.[0].author === user_id ? 'Tôi' : messages?.[0].author
      }</b>: ${main_message}`,
      data: {
        room_id: informations?.room_id,
        participant: informations?.participant
          ? informations.participant
          : 'none',
        is_group: informations?.is_group ? 1 : 0,
        type: 'message',
      },
      android: {
        channelId,
        style: {
          type: AndroidStyle.INBOX,
          lines: messages
            .reverse()
            .map(
              message =>
                `${
                  user_id === message.author_id
                    ? `<b style="color: ${Colors.primary}">Tôi</b>:`
                    : `<b>${message.author}</b>`
                } ${
                  message.images > 0
                    ? `đã gửi ${message.images} ảnh`
                    : message.content
                }`,
            ),
        },
        actions: [
          {
            title: 'Open',
            pressAction: {
              id: 'open-chat',
              launchActivity: 'default',
            },
          },
        ],
      },
    });
  }
}

async function onBackgroundHandler({detail, type}) {}

messaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(onBackgroundHandler);

AppRegistry.registerComponent(appName, () => App);

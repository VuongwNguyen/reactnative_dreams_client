import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {createStackNavigator} from '@react-navigation/stack';
import {createRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import LogoutDialog, {logoutRef} from '../components/LogoutDialog';
import AxiosInstance from '../configs/axiosInstance';
import {SocketProvider} from '../contexts/SocketContext';
import AuthNavigator from './AuthNavigator';
import {stackName, tabName} from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parseJwt} from '../utils/token';

const Stack = createStackNavigator();

export function Navigator() {
  const {
    authenticated,
    token: {accessToken},
  } = useSelector(state => state.account);

  useEffect(() => {
    if (!authenticated) return;

    const getFcmToken = async () => {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();

        console.log('register token');
        const res = AxiosInstance().post('/account/update-fcm', {
          token,
        });

        return res;
      } catch (e) {
        console.log('[Navigator]: update fcm failed', e);
      }
    };

    getFcmToken();

    const sub = messaging().onTokenRefresh(async token => {
      await AxiosInstance().post('/account/update-fcm', {
        token,
      });
    });

    return sub;
  }, [authenticated]);

  useEffect(() => {
    const bootstrap = async () => {
      const initialNotification = await notifee.getInitialNotification();

      console.log('noti: ', initialNotification?.notification);
      if (
        initialNotification &&
        initialNotification?.notification?.data?.type === 'message'
      ) {
        navigatorRef.current.navigate(stackName.bottomTab.name, {
          screen: tabName.chat.name,
        });
      }
    };

    bootstrap();

    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    AsyncStorage.setItem('credential', parseJwt(accessToken)?.user_id);
  }, [accessToken]);

  if (!authenticated) {
    return <AuthNavigator />;
  }

  return (
    <SocketProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={stackName.bottomTab.name}>
        <Stack.Screen
          name={stackName.bottomTab.name}
          component={stackName.bottomTab.component}
        />
        <Stack.Screen
          name={stackName.profile.name}
          component={stackName.profile.component}
        />
        <Stack.Screen
          name={stackName.postDetail.name}
          component={stackName.postDetail.component}
        />
        <Stack.Screen
          name={stackName.accountDetail.name}
          component={stackName.accountDetail.component}
        />
        <Stack.Screen
          name={stackName.changePassword.name}
          component={stackName.changePassword.component}
        />
        <Stack.Screen
          name={stackName.changeNewPassword.name}
          component={stackName.changeNewPassword.component}
        />
        <Stack.Screen
          name={stackName.forgotPassword.name}
          component={stackName.forgotPassword.component}
        />
        <Stack.Screen
          name={stackName.otp.name}
          component={stackName.otp.component}
        />
        <Stack.Screen
          name={stackName.newPost.name}
          component={stackName.newPost.component}
        />
        <Stack.Screen
          name={stackName.search.name}
          component={stackName.search.component}
        />
        <Stack.Screen
          name={stackName.privacySetting.name}
          component={stackName.privacySetting.component}
        />
        <Stack.Screen
          name={stackName.notificationSetting.name}
          component={stackName.notificationSetting.component}
        />
        <Stack.Screen
          name={stackName.languageSetting.name}
          component={stackName.languageSetting.component}
        />
        <Stack.Screen
          name={stackName.privacyPolicy.name}
          component={stackName.privacyPolicy.component}
        />
        <Stack.Screen
          name={stackName.following.name}
          component={stackName.following.component}
        />
        <Stack.Screen
          name={stackName.createGroupChat.name}
          component={stackName.createGroupChat.component}
        />

        <Stack.Screen
          name={stackName.conversation.name}
          component={stackName.conversation.component}
        />

        <Stack.Screen
          name={stackName.camera.name}
          component={stackName.camera.component}
        />
      </Stack.Navigator>
      <LogoutDialog ref={logoutRef} />
    </SocketProvider>
  );
}

export const navigatorRef = createRef();

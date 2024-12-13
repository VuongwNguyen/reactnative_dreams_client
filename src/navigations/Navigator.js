import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {createStackNavigator} from '@react-navigation/stack';
import {createRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LogoutDialog, {logoutRef} from '../components/LogoutDialog';
import AxiosInstance from '../configs/axiosInstance';
import {SocketProvider} from '../contexts/SocketContext';
import AuthNavigator from './AuthNavigator';
import {stackName, tabName} from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parseJwt} from '../utils/token';
import StreamProvider from '../contexts/StreamContext';
import {CallProvider} from '../contexts/CallContext';
import {APIGetUserBasicInf} from '../store/api/AccountAPI';
import AlertDialog, {alertRef} from '../components/dialog/AlertDialog';

const Stack = createStackNavigator();

export function Navigator() {
  const {
    authenticated,
    token: {accessToken},
  } = useSelector(state => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authenticated) return;

    const getFcmToken = async () => {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();

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

    dispatch(APIGetUserBasicInf());

    return sub;
  }, [authenticated]);

  useEffect(() => {
    const unsubNotifee = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    let first = false;

    const unsubNavigation = navigatorRef.current?.addListener(
      'state',
      async state => {
        if (state?.data?.state) {
          if (first) {
            return;
          }
          first = true;

          const initialNotification = await notifee.getInitialNotification();

          if (
            initialNotification &&
            initialNotification?.notification?.data?.type === 'message'
          ) {
            if (navigatorRef.current.isReady()) {
              navigatorRef.current.navigate(stackName.bottomTab.name, {
                screen: tabName.chat.name,
              });
            }
          }
        }
        // Bạn có thể thực hiện logic khác tại đây
      },
    );

    return () => {
      unsubNotifee();
      unsubNavigation();
    };
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
      <StreamProvider>
        <CallProvider>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={stackName.bottomTab.name}>
            <Stack.Screen
              name={stackName.settingGroup.name}
              component={stackName.settingGroup.component}
            />
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

            <Stack.Screen
              name={stackName.report.name}
              component={stackName.report.component}
            />

            <Stack.Screen
              name={stackName.chatSearch.name}
              component={stackName.chatSearch.component}
            />

            <Stack.Screen
              name={stackName.createGroup.name}
              component={stackName.createGroup.component}
            />
            <Stack.Screen
              name={stackName.call.name}
              component={stackName.call.component}
            />
          </Stack.Navigator>
        </CallProvider>
      </StreamProvider>
      <LogoutDialog ref={logoutRef} />
    </SocketProvider>
  );
}

export const navigatorRef = createRef();

import {createStackNavigator} from '@react-navigation/stack';
import {stackName} from './screens';
import AuthNavigator from './AuthNavigator';
import {useSelector} from 'react-redux';
import {SocketProvider} from '../contexts/SocketContext';
import LogoutDialog, {logoutRef} from '../components/LogoutDialog';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export function Navigator() {
  const {authenticated} = useSelector(state => state.account);

  // if (!authenticated) {
  //   return <AuthNavigator />;
  // }

  return (
    <SocketProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={stackName.report.name}>
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

        <Stack.Screen
          name={stackName.report.name}
          component={stackName.report.component}
        />
      </Stack.Navigator>
      <LogoutDialog ref={logoutRef} />
    </SocketProvider>
  );
}

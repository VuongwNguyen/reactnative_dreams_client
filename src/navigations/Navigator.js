import { createStackNavigator } from '@react-navigation/stack';
import { stackName } from './screens';
import Counter from '../example/Counter';
import Example from '../example/Example';

import ForgotPasswordScreen from '../screen/forgotpasswordscreen/ForgotPasswordScreen';
import ChangePasswordScreen from '../screen/changepassword/ChangePasswordScreen';
import ChangeNewPasswordScreen from '../screen/changenewpassword/ChangeNewPasswordScreen';
import HomeScreen from '../screen/homescreen/HomeScreen';
import OtpScreen from '../screen/otpscreen/OtpScreen';
import AccountDetailScreen from '../screen/accountdetail/AccountDetailScreen';
import PostDetailScreen from '../screen/postdetailscreen/PostDetailScreen';
import MessageScreen from '../screen/chatscreen/MessageScreen';
import ChatScreen from '../screen/chatscreen/ChatScreen';


const Stack = createStackNavigator();
export function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={stackName.example}>
      <Stack.Screen
        name={stackName.example}
        component={ChatScreen}
      />
      <Stack.Screen
        name={stackName.register.name}
        component={stackName.register.component}
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
        name={stackName.bottomTab.name}
        component={stackName.bottomTab.component}
      />
    </Stack.Navigator>
  );
}

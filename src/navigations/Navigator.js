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
import CreateGroupChatScreen from '../screen/creategroupchat/CreateGroupChatScreen';

const Stack = createStackNavigator();
export function Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={stackName.example} component={CreateGroupChatScreen} />
    </Stack.Navigator>
  );
}

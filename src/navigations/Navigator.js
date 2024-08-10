import {createStackNavigator} from '@react-navigation/stack';
import {stackName} from './screens';
import ForgotPasswordScreen from '../screen/forgotpasswordscreen/ForgotPasswordScreen';
import ChangePasswordScreen from '../screen/changepassword/ChangePasswordScreen';
import ChangeNewPasswordScreen from '../screen/changenewpassword/ChangeNewPasswordScreen';
const Stack = createStackNavigator();
export function Navigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={stackName.example}
        component={ChangeNewPasswordScreen}
      />
    </Stack.Navigator>
  );
}

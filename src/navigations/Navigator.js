import {createStackNavigator} from '@react-navigation/stack';
import {stackName} from './screens';
import Counter from '../example/Counter';
import ChangePasswordScreen from '../screen/ChangePasswordScreen';
import ChangeNewPasswordScreen from '../screen/ChangeNewPasswordScreen';
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

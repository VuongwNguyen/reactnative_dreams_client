import { createStackNavigator } from '@react-navigation/stack';
import { stackName } from './screens';
import Counter from '../example/Counter';
import ForgotPasswordScreen from '../screen/ForgotPasswordScreen';

const Stack = createStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={stackName.example} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

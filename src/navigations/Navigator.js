import {createStackNavigator} from '@react-navigation/stack';
import {stackName} from './screens';
import Counter from '../example/Counter';
import LoginScreen from '../screen/LoginScreen';

const Stack = createStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={stackName.register} component={LoginScreen} />
    </Stack.Navigator>
  );
}

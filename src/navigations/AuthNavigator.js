import {createStackNavigator} from '@react-navigation/stack';
import {stackName} from './screens';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={stackName.login.name}
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name={stackName.register.name}
        component={stackName.register.component}
      />
      <AuthStack.Screen
        name={stackName.login.name}
        component={stackName.login.component}
      />
      <AuthStack.Screen
        name={stackName.forgotPassword.name}
        component={stackName.forgotPassword.component}
      />
      <AuthStack.Screen
        name={stackName.otp.name}
        component={stackName.otp.component}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

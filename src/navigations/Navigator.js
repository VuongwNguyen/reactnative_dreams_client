import { createStackNavigator } from '@react-navigation/stack';
import { stackName } from './screens';

const Stack = createStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={stackName.bottomTab.name}>
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
      <Stack.Screen
        name={stackName.search.name}
        component={stackName.search.component}
      />
      <Stack.Screen
        name={stackName.privacySetting.name}
        component={stackName.privacySetting.component}
      />
    </Stack.Navigator>
  );
}


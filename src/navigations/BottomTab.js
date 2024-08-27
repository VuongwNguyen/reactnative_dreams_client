import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {tabName} from './screens';

const tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={tabName.home.name}>
      <tab.Screen name={tabName.home.name} component={tabName.home.component} />
      <tab.Screen
        name={tabName.notification.name}
        component={tabName.notification.component}
      />
      <tab.Screen
        name={tabName.search.name}
        component={tabName.search.component}
      />
      <tab.Screen
        name={tabName.profile.name}
        component={tabName.profile.component}
      />
    </tab.Navigator>
  );
};
export default BottomTab;

const style = StyleSheet.create({
  counter: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'orange',
    width: '50%',
    padding: 16,
    marginBottom: 8,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

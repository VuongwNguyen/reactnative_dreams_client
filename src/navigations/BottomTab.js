import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {tabName} from './screens';
import {useTranslation} from 'react-i18next';

const tab = createBottomTabNavigator();
const stack = createStackNavigator();

const BottomTab = () => {
  const {t} = useTranslation();
  return (
    <tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={tabName.home.name}>
      <tab.Screen
        name={t(tabName.home.name)}
        component={tabName.home.component}
      />
      <tab.Screen
        name={t(tabName.chat.name)}
        component={tabName.chat.component}
      />
      <tab.Screen
        name={tabName.EmtyScreen.name}
        component={tabName.EmtyScreen.component}
      />
      <tab.Screen
        name={t(tabName.notification.name)}
        component={tabName.notification.component}
      />
      <tab.Screen
        name={t(tabName.setting.name)}
        component={tabName.setting.component}
      />
    </tab.Navigator>
  );
};

export default BottomTab;

import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';
import InfomationTab from '../screen/profileScreen/InfomationTab';
import PostedTab from '../screen/profileScreen/PostedTab';
import {Colors} from '../styles';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigationProfile = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0CBBF0',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: {backgroundColor: '#0CBBF0'},
        tabBarLabelStyle: {
          fontSize: 15,
          textTransform: 'none',
          fontWeight: 700,
        },
        tabBarStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen name={t('profileScreen.information')} component={InfomationTab} />
      <Tab.Screen name={t('profileScreen.posted')} component={PostedTab} />
    </Tab.Navigator>
  );
};

export default TopBarNavigationProfile;

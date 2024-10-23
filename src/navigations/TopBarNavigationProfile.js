import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';
import InfomationTab from '../screen/profile/InfomationTab';
import PostedTab from '../screen/profile/PostedTab';
import {Colors} from '../styles';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigationProfile = props => {
  const {scrollHandler} = props;
  const {t} = useTranslation();
  return (
    <Tab.Navigator screenOptions={topBarOptions}>
      <Tab.Screen
        name={t('profileScreen.information')}
        children={() => <InfomationTab scrollHandler={scrollHandler} />}
      />
      <Tab.Screen
        name={t('profileScreen.posted')}
        children={() => <PostedTab scrollHandler={scrollHandler} />}
      />
    </Tab.Navigator>
  );
};

const topBarOptions = {
  tabBarActiveTintColor: '#0CBBF0',
  tabBarInactiveTintColor: 'black',
  tabBarIndicatorStyle: {backgroundColor: '#0CBBF0'},
  tabBarLabelStyle: {
    fontSize: 15,
    textTransform: 'none',
    fontWeight: 700,
  },
  tabBarStyle: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarPressColor: 'transparent',
};
export default TopBarNavigationProfile;

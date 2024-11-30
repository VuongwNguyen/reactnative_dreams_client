import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';
import InfomationTab from '../screen/profile/InfomationTab';
import PostedTab from '../screen/profile/PostedTab';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigationProfile = props => {
  const {scrollHandler, user_id_view} = props;
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={t('profileScreen.information')}
      screenOptions={topBarOptions}
      style={{flex: 1}}>
      <Tab.Screen
        name={t('profileScreen.information')}
        children={() => (
          <InfomationTab
            scrollHandler={scrollHandler}
            user_id_view={user_id_view}
          />
        )}
      />
      <Tab.Screen
        name={t('profileScreen.timeline')}
        children={() => (
          <PostedTab
            scrollHandler={scrollHandler}
            user_id_view={user_id_view}
          />
        )}
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

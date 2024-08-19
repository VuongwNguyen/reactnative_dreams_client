import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrendingPostTab from '../screen/homescreen/TrendingPostTab';
import FollowedPostTab from '../screen/homescreen/FollowedPostTab';
import { useTranslation } from 'react-i18next';


const Tab = createMaterialTopTabNavigator();

const TopBarNavigationHome = () => {
    const { t } = useTranslation()
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#0CBBF0',
                tabBarInactiveTintColor: 'black',
                tabBarIndicatorStyle: { backgroundColor: '#0CBBF0' },
                tabBarLabelStyle: { fontSize: 15, textTransform: 'none', fontWeight: 700 },
                tabBarStyle: {
                    backgroundColor: 'white',
                    marginHorizontal: 20,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarPressColor: 'transparent'
            }}
        >
            <Tab.Screen name={t("homeScreen.trending")} component={TrendingPostTab} />
            <Tab.Screen name={t("homeScreen.followed")} component={FollowedPostTab} />
        </Tab.Navigator>
    )
}

export default TopBarNavigationHome

const styles = StyleSheet.create({})
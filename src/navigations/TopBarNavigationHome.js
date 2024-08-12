import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrendingPostTab from '../screen/homescreen/TrendingPostTab';
import FollowedPostTab from '../screen/homescreen/FollowedPostTab';


const Tab = createMaterialTopTabNavigator();

const TopBarNavigationHome = () => {
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
            <Tab.Screen name="Trending" component={TrendingPostTab} />
            <Tab.Screen name="Followed" component={FollowedPostTab} />
        </Tab.Navigator>
    )
}

export default TopBarNavigationHome

const styles = StyleSheet.create({})
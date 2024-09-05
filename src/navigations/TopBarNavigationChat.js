import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import TabChatScreen from '../screen/chatscreen/TabChatScreen';
import TabCallScreen from '../screen/chatscreen/TabCallScreen';

const Tab = createMaterialTopTabNavigator();

const TopBarNavigationChat = () => {
    const { t } = useTranslation();
    return (
        <Tab.Navigator screenOptions={topTabOptions}>
            <Tab.Screen name={'CHATS'} component={TabChatScreen} />
            <Tab.Screen name={'CALLS'} component={TabCallScreen} />
        </Tab.Navigator>
    );
};

const topTabOptions = {
    tabBarActiveTintColor: '#0CBBF0',
    tabBarInactiveTintColor: 'black',
    tabBarIndicatorStyle: { backgroundColor: '#0CBBF0' },
    tabBarLabelStyle: { fontSize: 15, textTransform: 'none', fontWeight: 700 },
    tabBarStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
    },
    tabBarPressColor: 'transparent',
};

export default TopBarNavigationChat;
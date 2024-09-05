import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {stackName, tabName} from './screens';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const tab = createBottomTabNavigator();

const icons = ['home', 'message', 'notification', 'user'];

const TabBar = ({state, descriptors, navigation}) => {
  const renderIcon = (forcus, index) => {
    return (
      <EntypoIcon
        name={icons[index]}
        size={20}
        color={forcus ? '#0CBBF0' : '#6C757D'}
      />
    );
  };

  const newRoutes = [...state.routes];

  newRoutes.splice(2, 0, {
    name: stackName.newPost,
    key: stackName.newPost,
  });

  return (
    <View style={styles.container}>
      {newRoutes.map((route, index) => {
        const isFocused =
          state.index < 2 ? state.index === index : state.index + 1 === index;

        const onPress = () => {
          if (route.name === stackName.newPost) {
            navigation.navigate(route.name);
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }
        };

        return (
          <TouchableOpacity style={[styles.button]} onPress={onPress}>
            {route.name === stackName.newPost ? (
              <Image
                source={require('../../assets/images/add.png')}
                style={styles.img}
              />
            ) : (
              renderIcon(isFocused, index > 1 ? index - 1 : index)
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTab = () => {
  const {t} = useTranslation();

  return (
    <tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={tabName.home.name}
      tabBar={props => <TabBar {...props} />}>
      <tab.Screen
        name={t(tabName.home.name)}
        component={tabName.home.component}
      />
      <tab.Screen
        name={t(tabName.chat.name)}
        component={tabName.chat.component}
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

const styles = StyleSheet.create({
  img: {
    width: 58,
    height: 58,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: '50%',
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0EAFF',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

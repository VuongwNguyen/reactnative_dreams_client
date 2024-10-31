import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Assets} from '../styles';
import {stackName, tabName} from './screens';

const tab = createBottomTabNavigator();

const icons = [
  {default: Assets.icons.home, selected: Assets.icons.homeSelected},
  {default: Assets.icons.message, selected: Assets.icons.messageSelected},
  {
    default: Assets.icons.notification,
    selected: Assets.icons.notificationSelected,
  },
  {default: Assets.icons.setting, selected: Assets.icons.settingSelected},
];

const TabBar = ({state, descriptors, navigation}) => {
  const renderIcon = (focus, index) => {
    return (
      <View>
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={focus ? icons[index].selected : icons[index].default}
        />
      </View>
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
          <TouchableOpacity
            style={[styles.button]}
            onPress={onPress}
            key={index}>
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
  return (
    <tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={tabName.home.name}
      tabBar={props => <TabBar {...props} />}>
      <tab.Screen name={tabName.home.name} component={tabName.home.component} />
      <tab.Screen name={tabName.chat.name} component={tabName.chat.component} />
      <tab.Screen
        name={tabName.notification.name}
        component={tabName.notification.component}
      />
      <tab.Screen
        name={tabName.setting.name}
        component={tabName.setting.component}
      />
    </tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
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
    gap: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {stackName, tabName} from './screens';
import {OptionIcon} from './../styles/app/OptionIcon';
import {Assets} from '../styles';

const tab = createBottomTabNavigator();

// const icons = ['home', 'message', 'notification', 'user'];

const icons = [
  {type: 'Entypo', icon: Assets.icon.home},
  {type: 'Foundation', icon: Assets.icon.message},
  {type: 'Entypo', icon: Assets.icon.notification},
  {type: 'MaterialIcons', icon: Assets.icon.setting},
];

const TabBar = ({state, descriptors, navigation}) => {
  const renderIcon = (forcus, index) => {
    return (
      <View>
        <OptionIcon icon={icons[index]} />
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
    gap: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

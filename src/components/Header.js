import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Assets, Typography} from '../styles';
import {AppHeaderStyle} from '../styles/components/header/HeaderStyle';
import {useNavigation} from '@react-navigation/native';
const AppHeader = props => {
  const {
    title = '',
    rightButton = false,
    rightButtonAction = () => {},
    rightButtonTitle = '',
  } = props;
  const navigation = useNavigation();
  return (
    <View style={AppHeaderStyle.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={Assets.icons.arrowLeft} style={AppHeaderStyle.icon} />
      </TouchableOpacity>
      <Text style={Typography.navTitle}>{title}</Text>
      {rightButton ? (
        <TouchableOpacity
          style={AppHeaderStyle.rightButton}
          onPress={rightButtonAction}>
          <Text style={AppHeaderStyle.titleRightButton}>
            {rightButtonTitle}
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default AppHeader;

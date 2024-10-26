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
    isDisabled = false,
    onGoBack = () => {},
  } = props;
  const navigation = useNavigation();

  return (
    <View style={AppHeaderStyle.container}>
      <TouchableOpacity
        onPress={() => {
          onGoBack();
          navigation.goBack();
        }}>
        <Image source={Assets.icons.arrowLeft} style={AppHeaderStyle.icon} />
      </TouchableOpacity>
      <Text style={Typography.navTitle}>{title}</Text>
      {rightButton ? (
        <TouchableOpacity
          disabled={isDisabled}
          style={
            isDisabled
              ? AppHeaderStyle.disabledButton
              : AppHeaderStyle.rightButton
          }
          onPress={rightButtonAction}>
          <Text
            style={[
              AppHeaderStyle.titleRightButton,
              isDisabled && {color: 'black'},
            ]}>
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

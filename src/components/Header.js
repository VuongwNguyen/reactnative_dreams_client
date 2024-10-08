import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Assets, Typography} from '../styles';
import {AppHeaderStyle} from '../styles/components/header/HeaderStyle';

const AppHeader = props => {
  const {
    title = '',
    goBack,
    rightButton = false,
    rightButtonAction = () => {},
    rightButtonTitle = '',
  } = props;
  return (
    <View style={AppHeaderStyle.container}>
      <TouchableOpacity onPress={goBack}>
        <Image
          source={Assets.icons.arrowLeft}
          style={{height: 20, width: 20}}
        />
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

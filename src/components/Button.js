import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppButtonStyle} from '../styles/components/button/ButtonStyle';

const AppButton = props => {
  const {title = '', onPress} = props;
  return (
    <TouchableOpacity
      style={ AppButtonStyle.container}
      onPress={onPress}>
      <Text style={AppButtonStyle.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

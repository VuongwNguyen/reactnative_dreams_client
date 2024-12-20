import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonStyle} from './../styles/components/button/ButtonStyle';
const AppButton = props => {
  const {title = '', onPress, isDisable = false} = props;
  return (
    <TouchableOpacity
      style={[
        ButtonStyle.container,
        isDisable && {backgroundColor: 'rgba(12, 187, 240, 0.5)'},
      ]}
      onPress={onPress}
      disabled={isDisable}>
      <Text style={ButtonStyle.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

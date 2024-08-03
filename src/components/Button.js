import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonStyle} from './../styles/components/button/ButtonStyle';
const AppButton = props => {
  const {title = '', onPress} = props;
  return (
    <TouchableOpacity
      style={ ButtonStyle.container}
      onPress={onPress}>
      <Text style={ButtonStyle.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

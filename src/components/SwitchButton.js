import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const SwitchButton = props => {
  const {isOn, onPress=()=>{}} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.icon}
        source={
          isOn
            ? require('../../assets/icons/switch-on.png')
            : require('../../assets/icons/switch-off.png')
        }
      />
    </TouchableOpacity>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

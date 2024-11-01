import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../styles';

const Chip = ({isSelected, onPressed, title}) => {
  return (
    <TouchableOpacity
      onPress={onPressed}
      style={[styles.container, isSelected && styles.selected]}>
      <Text style={[styles.title, isSelected && styles.titleSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  titleSelected: {
    color: 'white',
  },
  title: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'semibold',
  },
  selected: {
    borderWidth: 0,
    backgroundColor: Colors.primary,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'black',
  },
});

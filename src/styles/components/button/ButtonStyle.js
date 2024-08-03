import {StyleSheet} from 'react-native';
import {Colors, Scaling,Typography} from '../..';

export const ButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Scaling.md,
  },
  title: {
    ...Typography.button,
    color: Colors.white,
  },
});
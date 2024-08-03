import {StyleSheet} from 'react-native';
import {Colors, Scaling} from '../../';
import {Typography} from '../../';

export const AppButtonStyle = StyleSheet.create({
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
import {StyleSheet} from 'react-native';
import {Colors, Scaling, Typography} from '../..';

export const ButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Scaling.md,
    paddingVertical: 15,
  },
  title: {
    ...Typography.button,
    color: Colors.white,
    textTransform: 'uppercase',
  },
});

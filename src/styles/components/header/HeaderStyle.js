import {StyleSheet} from 'react-native';
import {Colors, Scaling, Spacings, Typography} from '../../';

export const AppHeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    maxHeight: 35,
    justifyContent: 'space-between',
  },
  rightButton: {
    backgroundColor: Colors.primary,
    borderRadius: Scaling.xs,
  },
  emptyRightButton: {
    width: 60,
    height: 30,
  },
  titleRightButton: {
    color: Colors.white,
    paddingVertical: Spacings.sm,
    paddingHorizontal: Spacings.md,
  },
  title: {
    ...Typography.navTitle,
    color: Colors.black,
  },
});

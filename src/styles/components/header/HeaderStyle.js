import {StyleSheet} from 'react-native';
import {Colors, Fonts, Scaling, Spacings, Typography} from '../../';

export const AppHeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    maxHeight: 40,
    justifyContent: 'space-between',
    paddingHorizontal: Spacings.md,
  },
  rightButton: {
    backgroundColor: Colors.primary,
    borderRadius: Scaling.xs,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  disabledButton: {
    backgroundColor: Colors.secondary,
    borderRadius: Scaling.xs,
    paddingHorizontal: 15,
    paddingVertical: 6,
    opacity: 0.4,
  },
  titleRightButton: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 14,
    color: 'white',
  },
  title: {
    ...Typography.navTitle,
    color: Colors.black,
  },
});

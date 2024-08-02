import {StyleSheet} from 'react-native';
import {Colors,Scaling} from '../../';

export const AppButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Scaling.md,
  },
  label: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Scaling.lg,
  },
});

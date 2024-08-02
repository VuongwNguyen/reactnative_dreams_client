import {StyleSheet} from 'react-native';
import {Colors} from '../../app/Colors';

export const AppButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.color,
    flex: 1,
    maxHeight: 50,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

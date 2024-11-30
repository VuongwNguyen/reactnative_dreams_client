import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../';

export const NotificationSettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 30,
    paddingHorizontal: Spacings.pd,
    gap: 20,
  },
});

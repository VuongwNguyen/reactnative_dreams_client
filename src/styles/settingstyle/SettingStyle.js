import {StyleSheet} from 'react-native';
import {Colors} from '../';

export const SettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  itemSettingContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  line: {
    backgroundColor: Colors.secondary,
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  titleRed: {
    flex: 1,
    fontSize: 16,
    color: 'red',
  },
});

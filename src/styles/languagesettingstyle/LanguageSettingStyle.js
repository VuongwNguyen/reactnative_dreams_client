import {StyleSheet} from 'react-native';
import {Colors} from '../';

export const LanguageSettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: 'black',
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 20,
    gap: 10,
  },
});

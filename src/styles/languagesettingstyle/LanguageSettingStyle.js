import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../';

export const LanguageSettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: 'black',
  },
  content: {
    marginTop: 30,
    paddingHorizontal: Spacings.pd,
    gap: 20,
  },
});

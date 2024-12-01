import {StyleSheet} from 'react-native';
import {Colors, Spacings} from '../';

export const SettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    padding: Spacings.pd,
  },
  userTag: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 25,
  },
  itemSettingContainer: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 12,
  },
  title: {
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
  notiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

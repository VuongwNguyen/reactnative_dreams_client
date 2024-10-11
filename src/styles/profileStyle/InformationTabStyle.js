import {StyleSheet} from 'react-native';
import {Typography} from '../app/Typographys';
import {Colors} from '../app/Colors';
export const InfomationTabStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  title: {
    ...Typography.cmtName,
  },
  value: {
    ...Typography.cmtName,
    color: 'black',
  },
});

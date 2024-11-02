import {StyleSheet} from 'react-native';
import {Typography} from '../app/Typographys';
import {Colors} from '../app/Colors';
import {Fonts} from '../app/Fonts';
export const InfomationTabStyle = StyleSheet.create({
  placeholder: {
    margin: 'auto',
    fontFamily: Fonts.roboto.regular,
    fontSize: 18,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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

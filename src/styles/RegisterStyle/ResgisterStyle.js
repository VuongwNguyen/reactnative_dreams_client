import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacings, Typography} from '../';

export const RegisterStyle = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 30,
  },
  containerForm: {
    gap: 25,
  },
  containerHeader: {
    alignItems: 'center',
    gap: 12,
  },
  containerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  headerText: {
    ...Typography.title,
    color: 'black',
    lineHeight: 30,
  },
  groupNameContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 30,
  },
  groupName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  link: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  textError: {
    ...Typography.edtHint,
    color: Colors.error,
    alignSelf: 'center',
  },
});

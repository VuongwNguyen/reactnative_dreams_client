import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacings, Typography} from '../';

export const RegisterStyle = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: Spacings.lg,
  },
  containerForm: {
    flex: 1,
    marginVertical: 20,
    gap: 25,
  },
  containerHeader: {
    alignItems: 'center',
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
    alignContent: 'center',
    textAlign: 'center',
    lineHeight: 30,
    marginVertical: 10,
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
  scrollView: {
    flexGrow: 1,
  },
});

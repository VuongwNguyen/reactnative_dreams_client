import {StyleSheet} from 'react-native';
import {Colors, Spacings, Typography} from '../';

export const RegisterStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacings.lg,
  },
  containerForm: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 350,
    marginVertical: 20,
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
  },
  containerLink: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0CBBF0',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: '100%',
    height: 70,
    borderRadius: 15,
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

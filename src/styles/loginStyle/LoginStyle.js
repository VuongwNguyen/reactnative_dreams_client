import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Spacings, Typography} from '../';

export const LoginStyle = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacings.lg,
    gap: 30,
  },
  containerHeader: {
    alignItems: 'center',
    gap: 12,
  },
  containerForm: {
    flex: 1,
    gap: 25,
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
    textAlign: 'center',
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

  checkBoxContainer: {
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row',
    gap: 5,
  },
  checkBox: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  logo: {
    width: 120,
    height: 120,
  },
  row: {
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    ...Typography.navTitle,
    color: 'black',
  },
  differentLoginContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  orText: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subTitle: {
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

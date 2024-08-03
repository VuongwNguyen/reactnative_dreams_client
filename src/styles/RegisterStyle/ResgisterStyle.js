import { StyleSheet } from 'react-native'
import { Colors, Spacings, Typography } from '../'

export const RegisterStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacings.lg,
  },
  containerForm: {
    flex: 1,
    gap: 30,
    marginVertical: 30,
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
    gap: 10
  },
  button: {
    marginTop: 30
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
    marginVertical: 10
  },
  groupNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 30
  },
  groupName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  link: {
    color: Colors.primary,
    fontWeight: 'bold'
  },
  textError: {
    ...Typography.bsdDescription,
    color: Colors.error,
    alignSelf: 'center'
  },
  scrollView:{
    flexGrow: 1
  }
})

import { StyleSheet } from 'react-native'
import { Colors, Typography } from '../'

export const RegisterStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  containerForm: {
    flex: 1,
    gap: 30,
    marginVertical: 30,
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    // fontWeight: 'bold',
    // fontSize: 19,
    // lineHeight: 22,
    // fontWeight: '600',
    ...Typography.title,
    color: 'black',
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
    color: Colors.primary.color,
    fontWeight: 'bold'
  },
  textError: {
    color: 'red',
    fontSize: 18,
    alignSelf: 'center'
  },
  scrollView:{
    flexGrow: 1
  }
})

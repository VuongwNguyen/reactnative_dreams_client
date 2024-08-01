import { StyleSheet } from 'react-native'
import { Colors } from '../app/Colors'

export const RegisterStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  containerForm: {
    gap: 30,
    flex: 1,
    marginVertical: 30,
    flexDirection: 'column',
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
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '600',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  groupName: {
    flex: 1,
    flexDirection: 'row',
    gap: 30
  },
  link: {
    color: Colors.primary.color,
    fontWeight: 'bold'
  }
})

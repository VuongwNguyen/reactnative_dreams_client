import { StyleSheet } from 'react-native'
import { Colors } from '../../app/Colors'

export const AuthButtonStyle = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.color,
    flex: 1,
    maxHeight: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
})

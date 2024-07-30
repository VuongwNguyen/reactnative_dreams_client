import { StyleSheet } from 'react-native'
import { Colors } from '../../app/Colors'

export const AppInputStyle = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.background.backgroundColor,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6C757D',
    position: 'absolute',
    bottom: 12,
    left: 0,
  },
  groupInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16
  },
  eyeIcon: { size: 24, color: 'black' },
  line: { height: 1, width: '100%', backgroundColor: '#D9D9D9' }
})

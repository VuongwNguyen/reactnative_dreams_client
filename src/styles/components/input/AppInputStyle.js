import { StyleSheet } from 'react-native'

export const AppInputStyle = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#6C757D'
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6C757D',
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  groupInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingBottom: 0
  },
  eyeIcon: { size: 24, color: 'black' },
})

import { StyleSheet } from 'react-native'

export const AppInputStyle = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#6C757D'
  },
  containerError: {
    flex: 1,
    maxHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: 'red'
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6C757D',
    position: 'absolute',
    bottom:0,
    left: 5,
  },
  labelError: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
    position: 'absolute',
    bottom:0,
    left: 5,
  },
  groupInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingBottom: 0,
    marginBottom: -5,
    marginStart: -4
  }
})

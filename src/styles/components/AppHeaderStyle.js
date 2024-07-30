import { StyleSheet } from 'react-native'
import { Colors } from '../app/Colors'

export const AppHeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
    paddingHorizontal: 20
  },
  rightButton: {
    width: 60,
    height: 30,
    backgroundColor: Colors.primary.color,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  titleRightButton: {
    color: 'white'
  }
})

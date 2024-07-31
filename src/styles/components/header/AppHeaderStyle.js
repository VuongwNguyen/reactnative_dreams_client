import { StyleSheet } from 'react-native'
import { Colors } from '../../app/Colors'

export const AppHeaderStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    maxHeight: 35,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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

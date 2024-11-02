import {StyleSheet} from 'react-native';
import {Colors} from '../app/Colors';
export const FlingStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  item: {
    flexDirection: 'row',
    height: 60,
    marginTop: 10,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  userInfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  flowwing: {
    height: 30,
    width: 100,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
  },
  flowwed: {
    height: 30,
    width: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  flowwedText: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: 'center',
  },
  flowwingText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

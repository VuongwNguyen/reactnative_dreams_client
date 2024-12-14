import {StyleSheet} from 'react-native';
import {Colors} from '../app/Colors';
import {Spacings} from '../app/Spacings';
import {Fonts} from '../app/Fonts';
export const FlingStyle = StyleSheet.create({
  placeholder: {
    margin: 'auto',
    fontFamily: Fonts.roboto.regular,
    fontSize: 18,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bodyContainer: {
    padding: Spacings.pd,
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  followed: {
    height: 34,
    width: 100,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  follow: {
    height: 34,
    width: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followText: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: 'center',
    fontFamily: Fonts.roboto.medium,
  },
  followedText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.roboto.medium,
  },
});

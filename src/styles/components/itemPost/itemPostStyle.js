import {StyleSheet} from 'react-native';
import {Colors, Fonts} from './../../../styles';

export const itemPostStyle = StyleSheet.create({
  headerLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    fontFamily: Fonts.nunitonSans.regular,
  },
  container: {
    paddingHorizontal: 5,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  content: {
    gap: 10,
  },
  interactContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: Colors.secondary,
    padding: 10,
    paddingHorizontal: 15,

  },
  interactLabel: {
    fontFamily: Fonts.roboto.semibold,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    marginLeft: 5,
  },
  itemInteract: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
});

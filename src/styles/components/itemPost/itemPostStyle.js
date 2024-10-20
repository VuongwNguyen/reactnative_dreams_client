import {StyleSheet} from 'react-native';
import {Colors, Fonts} from './../../../styles';

export const itemPostStyle = StyleSheet.create({
  headerLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    fontFamily: Fonts.roboto.regular,
  },
  tag: {
    color: Colors.primary,
  },
  container: {
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
    marginTop: 10,
    gap: 5,
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
    fontFamily: Fonts.roboto.medium,
    fontSize: 16,
    fontStyle: 'normal',
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

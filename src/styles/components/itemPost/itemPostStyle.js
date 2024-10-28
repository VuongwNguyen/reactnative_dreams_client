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
    paddingHorizontal: 10,
    paddingTop: 10,
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
    gap: 5
  },
  interactContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: Colors.secondary,
    padding: 5,
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
  headerMore: {
    position: 'absolute',
    right: 0,
  },
  headerMoreIcon: {
    width: 20,
    height: 20,
  },
  headerMoreContainer:{
    backgroundColor: 'white',
    width: 120,
    height: 130,
    position: 'absolute',
    right: 20,
    top: 10,
    padding: 10,
    gap: 10,
    borderRadius: 10,
    borderColor: Colors.secondary,
    elevation: 8,
  }
});

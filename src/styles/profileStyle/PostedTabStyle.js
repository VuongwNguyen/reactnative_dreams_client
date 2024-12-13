import {StyleSheet} from 'react-native';
import {Typography} from '../app/Typographys';
import { Fonts } from '../app/Fonts';
export const PostedTabStyle = StyleSheet.create({
  placeholder: {
    margin: 'auto',
    fontFamily: Fonts.roboto.regular,
    fontSize: 18,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  itemContainer: {
    paddingVertical: 5,
    marginBottom: 5,
    height: 'auto',
  },
  interactionContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    justifyContent: 'space-between',
    borderTopColor: 'rgba(108, 117, 125, 0.30)',
    marginVertical: 5,
    paddingTop: 5,
  },
  nameGroupCoantainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  avatarItemPost: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  iconMore: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  interactionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 5,
  },
  title: {
    ...Typography.cmtName,
  },
  name: {
    ...Typography.cmtName,
    textAlign: 'top',
    color: 'black',
    height: 'auto',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(108, 117, 125, 0.30)',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  post: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  swiper: {
    height: 200,
  },
  content: {
    marginVertical: 5,
  },
});

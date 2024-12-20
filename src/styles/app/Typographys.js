import {StyleSheet} from 'react-native';
import {Fonts} from './Fonts';
import {Colors} from './Colors';

export const Typography = StyleSheet.create({
  title: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '800',
    // lineHeight: 18,
    letterSpacing: -0.17,
  },
  subTitle: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25,
    letterSpacing: -0.17,
  },
  navTitle: {
    fontFamily: Fonts.roboto.medium,
    fontStyle: 'normal',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#000',
    color: '#000',
  },
  edtHint: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  edtValue: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color:'black'
  },
  bsdTitle: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  bsdDescription: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25,
  },
  cPostHint: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 8,
  },
  postTitle: {
    fontFamily: Fonts.roboto.medium,
    fontSize: 15,
    letterSpacing: 0.5,
    textTransform: 'capitalize',
    color: Colors.black,
    lineHeight: 22,
  },
  postContent: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 15,
    fontStyle: 'normal',
    lineHeight: 21,
    color: Colors.black,
  },
  postName: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 16,
    fontStyle: 'normal',
    color: Colors.black,
  },
  cmtContent: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
  },
  cmtName: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  button: {
    fontFamily: Fonts.roboto.medium,
    fontSize: 19,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
  },
  tagInf: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 15,
    lineHeight: 18,
  },
  typeInf: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 17,
  },
  privacySettingDesc: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 18,
    lineHeight: 24,
  },
  tagOptionSelected: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 14,
    color: Colors.white,
  },
  tagOptionUnSelected: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 14,
    color: Colors.black,
  },
  smallTextInSearch: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 12,
  },
  searchAccountName: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 16,
    color: Colors.black,
  },
  userNotification: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 14,
    color: 'black',
  },
  contentNotification: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 14,
    color: 'black',
  },
  timeNotification: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 12,
    color: Colors.secondary,
  },
  followLabel: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 12,
    lineHeight: 14,
    color: Colors.black,
  },
  titleDialog: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 24,
    color: Colors.black,
  },
  descDialog: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.secondary,
  },
  btnLabelDialog: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 20,
    color: Colors.white,
  },
  normalTextDialog: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    lineHeight: 19,
    color: Colors.black,
  },
  genderLabel: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 16,
  },
  derivedField: {
    fontFamily: Fonts.roboto.bold,
    fontSize: 20,
    color: Colors.black,
  },
});

import {StyleSheet} from 'react-native';
import { Fonts } from './Fonts';
import { Spacings } from './Spacings';
import { Colors } from './Colors';

export const Typography = StyleSheet.create({
  title: {
    fontFamily: Fonts.nunitonSans.extrabold,
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: '800',
    // lineHeight: 18,
    letterSpacing: -0.17,
  },
  subTitle: {
    fontFamily: Fonts.nunitonSans.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25,
    letterSpacing: -0.17,
  },
  navTitle: {
    fontFamily: Fonts.roboto.semibold,
    fontStyle: 'normal',
    fontSize: 19,
    fontWeight: '600',
    lineHeight: 22,
  },
  edtHint: {
    fontFamily: Fonts.inter.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  edtValue: {
    fontFamily: Fonts.inter.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  bsdTitle: {
    fontFamily: Fonts.inter.bold,
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  bsdDescription: {
    fontFamily: Fonts.inter.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25,
  },
  cPostHint: {
    fontFamily: Fonts.nunitonSans.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 8,
  },
  postContent: {
    fontFamily: Fonts.nunitonSans.semibold,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 21,
  },
  postName: {
    fontFamily: Fonts.nunitonSans.bold,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  cmtContent: {
    fontFamily: Fonts.nunitonSans.regular,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
  },
  cmtName: {
    fontFamily: Fonts.nunitonSans.bold,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  button: {
    fontFamily: Fonts.roboto.semibold,
    fontSize: 19,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
  },
});

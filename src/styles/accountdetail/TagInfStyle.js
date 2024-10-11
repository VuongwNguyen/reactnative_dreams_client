import {Colors, Fonts, Typography} from '../../styles';
export const tagInfStyle = {
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  tagTitle: {
    ...Typography.tagInf,
    color: Colors.black,
    fontFamily: Fonts.roboto.bold,
  },
  content: {
    ...Typography.tagInf,
    color: Colors.secondary,
  },
  textContainer: {
    gap: 5,
  },
};

import {Colors, Fonts, Typography} from '../../styles';
export const tagInfStyle = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 35,
  },
  infContainer: {
    flexDirection: 'row',
    gap: 16,
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
    flex: 1,
  },
};

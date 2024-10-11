import {Colors, Fonts, Scaling, Spacings, Typography} from '../../styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const avtSize = width * 0.187;
const imgPostWidth = width * 0.25;
const imgPostHeight = height * 0.16;
export const newPostStyle = {
  container: {
    flex: 1,
    padding: Spacings.lg,
    backgroundColor: Colors.white,
  },
  bodyContainer: {
    flex: 1,
    marginTop: Spacings.lg,
  },
  accountContainer: {
    flexDirection: 'row',
    gap: Spacings.lg,
    alignItems: 'center',
  },
  avt: {
    width: avtSize,
    height: avtSize,
    borderRadius: avtSize / 2,
  },
  inf: {
    gap: 10,
  },
  userName: {
    ...Typography.postName,
    color: Colors.black,
  },
  postContainer: {
    flex: 1,
    marginTop: Spacings.lg,
  },
  openLine: {
    minHeight: 50,
    ...Typography.postContent,
    color: Colors.black,
  },
  contentPost: {
    ...Typography.postContent,
    color: Colors.black,
  },
  dropdown: {
    minWidth: 110,
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.xs,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: Scaling.sm,
    color: '#ccc',
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,
  },
  icDelete: {
    width: 20,
    height: 20,
  },
  imgBox: {
    width: imgPostWidth,
    height: imgPostHeight,
  },
  icPlay: {
    position: 'absolute',
    top: imgPostHeight / 2 - 12,
    left: imgPostWidth / 2 - 12,
    zIndex: 1,
  },
  imgPost: {
    width: '100%',
    height: '100%',
  },
  removeIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  imgContainer: {
    height: imgPostHeight,
    flexDirection: 'row',
    gap: 15,
  },
  showAttachContainer: {
    paddingTop: 0,
    gap: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  privacyStatus: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 14,
    color: '#000',
  },
  dropdownLabel: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 14,
    color: Colors.secondary,
  },
};

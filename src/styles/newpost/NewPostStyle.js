import {Colors, Scaling, Spacings, Typography} from '../../styles';
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
    width: 100,
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.xs,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: Scaling.sm,
  },
  attachmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
  iconBtn: {
    width: 24,
    height: 24,
  },
  imgBox: {
    width: imgPostWidth,
    height: imgPostHeight,
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
};

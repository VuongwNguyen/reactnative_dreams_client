import {Colors, Typography} from '../../styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const avtSize = width * 0.16;

export const notificationItemStyle = {
  container: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 0.8,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  avt: {
    width: avtSize,
    height: avtSize,
    borderRadius: avtSize / 2,
  },

  username: {
    ...Typography.userNotification,
  },

  content: {
    ...Typography.contentNotification,
  },
  time: {
    ...Typography.timeNotification,
    paddingLeft: 15,
  },
  centerBox: {
    flex: 1,
    gap: 10,
  },
  followButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  followLabel: {
    ...Typography.followLabel,
  },
};

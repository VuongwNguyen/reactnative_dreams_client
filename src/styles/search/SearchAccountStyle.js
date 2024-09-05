import {Typography, Scaling, Colors} from '../../styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const avtSize = width * 0.13;
export const searchAccountStyle = {
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  avt: {
    width: avtSize,
    height: avtSize,
    borderRadius: avtSize / 2,
  },
  infText: {
    gap: 10,
  },
  name: {
    ...Typography.searchAccountName,
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  location: {
    ...Typography.smallTextInSearch,
    color: Colors.secondary,
  },
  followBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Scaling.xs,
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: 'white',
  },
  followLabel: {
    ...Typography.smallTextInSearch,
    color: 'black',
  },
  followedBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    borderRadius: Scaling.xs,
    backgroundColor: Colors.primary,
  },
  followedLabel: {
    ...Typography.smallTextInSearch,
    color: 'white',
  },
};

import {Colors} from '../app/Colors';
import {Scaling} from '../app/Scaling';
import {Spacings} from '../app/Spacings';
import {Typography} from '../app/Typographys';

export const notificationStyle = {
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItem: 'center',
    minHeight: 50,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 0.5,
  },
  tagContainer: {
    margin: 18,
    flexDirection: 'row',
  },
  tagSelected: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: Colors.primary,
    borderRadius: Scaling.xs,
  },
  tagUnSelected: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: Scaling.xs,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  tagLabelSelected: {
    ...Typography.tagOptionSelected,
  },
  tagLabelUnSelected: {
    ...Typography.tagOptionUnSelected,
  },
};

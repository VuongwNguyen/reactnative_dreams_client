import {Colors, Scaling, Spacings, Typography} from '../../styles';
export const privacySettingItemStyle = {
  container: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },
  infContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  contentContainer: {
    gap: 5,
  },
  title: {
    ...Typography.typeInf,
    color: 'black',
  },
  content: {
    ...Typography.tagInf,
    color: Colors.secondary,
  },
  dropdown: {
    minWidth: '33%',
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.xs,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: Scaling.sm,
  },
  icon: {
    paddingRight: 5,
  },
  dropdownText: {
    color: 'black',
  },
};

import { StyleSheet } from 'react-native';
import { Colors } from '../app/Colors';
import { Typography } from '../app/Typographys';
import { Fonts } from '../app/Fonts';

export const ProfileStyle = StyleSheet.create({
  editBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  headerContainer: {
    minHeight: 40,
  },
  countItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grouptButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  buttonContainer: {
    width: 150,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',

  },
  editBtnContainer: {
    width: '100%',
    marginVertical: 10,
  },
  btnEditProfile: {
    width: '90%',
    margin: 'auto',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 15,
  },
  editBtnLabel: {
    ...Typography.postName,
    color: 'white',
  },
  activeTabContainer: {
    flex: 1,
    height: 41,
    borderBottomWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveTabContainer: {
    flex: 1,
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabText: {
    ...Typography.postName,
    color: Colors.primary,
  },
  inactiveTabText: {
    ...Typography.postName,
    color: 'black',
  },
  inboxButton: {
    backgroundColor: Colors.primary,
  },
  inboxText: {
    ...Typography.postName,
    color: 'white',
  },
  followButton: {
    borderWidth: 1,
    borderColor: 'black',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  name: {
    ...Typography.postName,
    color: 'black',
    marginVertical: 10,
    marginRight: 5,
  },
  nickname: {
    fontFamily: Fonts.roboto.regular,
    color: 'black',
    fontSize: 15,
  },
  title: {
    ...Typography.postName,
    color: 'black',
  },
  subtitle: {
    ...Typography.subTitle,
  },
});

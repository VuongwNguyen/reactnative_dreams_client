import {Colors, Fonts, Scaling, Spacings, Typography} from '../../styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const avtSize = width * 0.18;
const imgPostWidth = width * 0.25;
const imgPostHeight = height * 0.16;
export const newPostStyle = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItem: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerContainer: {
    height: 40,
    marginHorizontal: -12,
  },
  activityIndicator: {
    position: 'absolute',
    top: 10,
    right: 28,
  },
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
    fontFamily: Fonts.roboto.medium,
  },
  contentPost: {
    ...Typography.postContent,
    
  },
  privacyDropdown: {
    minWidth: 110,
    paddingHorizontal: Spacings.sm,
    paddingVertical: Spacings.xs,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
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
  // modal view
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    top: 0.25 * height,
    width: '95%',
    marginHorizontal: 'auto',
    backgroundColor: 'white',
    padding: 20,
    gap: 15,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Colors.background,
    // Hiệu ứng đổ bóng cho iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Hiệu ứng đổ bóng cho Android
    elevation: 8,
  },
  modalTitle: {
    color: Colors.black,
    fontFamily: Fonts.roboto.bold,
    fontSize: 20,
    textAlign: 'center',
  },

  dropdown: {
    minWidth: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  selectedStyle: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 15,
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  cancel: {
    fontSize: 14,
    fontFamily: Fonts.roboto.medium,
    textAlign: 'right',
    color: 'gray',
  },
  addLabel: {
    fontSize: 16,
    fontFamily: Fonts.roboto.medium,
    color: 'white',
  },
  addBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  inputRow: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  hashTagInput: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    color: 'black',
  },
  dataDialogRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  primaryText: {
    fontFamily: Fonts.roboto.medium,
    fontSize: 16,
    color: Colors.primary,
  },
  showDataFromDialog: {
    gap: 15,
    marginVertical: 20,
  },
};

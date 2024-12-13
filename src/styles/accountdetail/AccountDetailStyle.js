import {Colors, Fonts, Sizing, Spacings, Typography} from '../../styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const avtSize = width * 0.32;
const avtRadius = avtSize / 2;
const changeBtnSize = avtSize / 3;
const changeBtnRadius = changeBtnSize / 2;
export const accountDetailStyle = {
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: Spacings.pd,
  },

  bodyContainer: {
    flex: 1,
    gap: 30,
    marginTop: Spacings.lg,
  },

  avtContainer: {
    width: avtSize,
    height: avtSize,
    marginHorizontal: 'auto',
  },
  avt: {
    width: '100%',
    height: '100%',
    borderRadius: avtRadius,
    borderWidth: 1,
    borderColor: 'gray',
  },
  loadingAvt: {
    position: 'absolute',
    top: avtSize * 0.4,
    left: avtSize * 0.4,
  },
  changeAvtButton: {
    width: changeBtnSize,
    height: changeBtnSize,
    borderRadius: changeBtnRadius,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: -15,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupInfContainer: {
    gap: 10,
  },
  infBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 15,
    paddingVertical: 15,
    gap: 12,
  },
  typeInf: {
    ...Typography.typeInf,
    Colors: Colors.secondary,
  },
  // modal styles

  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    position: 'absolute',
    left: '12%',
    top: 0.25 * height,
    width: '75%',
    marginHorizontal: 'auto',
    backgroundColor: Colors.white,
    alignItems: 'center',
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
    ...Typography.tagInf,
    color: Colors.black,
    fontFamily: Fonts.roboto.bold,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  optionItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  optionIconSize: {
    width: Sizing.lg,
    height: Sizing.lg,
  },
  optionText: {
    ...Typography.tagInf,
    color: Colors.secondary,
  },
};

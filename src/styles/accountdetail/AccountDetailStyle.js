import {Colors, Spacings, Typography} from '../../styles';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const avtSize = width * 0.32;
const avtRadius = avtSize / 2;
const changeBtnSize = avtSize / 3;
const changeBtnRadius = changeBtnSize / 2;
export const accountDetailStyle = {
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#FFFFFF',
    padding: Spacings.lg,
  },

  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 30,
    marginTop: Spacings.lg,
    marginBottom: Spacings.xl,
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
  },
  changeAvtButton: {
    width: changeBtnSize,
    height: changeBtnSize,
    borderRadius: changeBtnRadius,
    position: 'absolute',
    bottom: -15,
    right: 0,
  },
  groupInfContainer: {
    gap: 10,
  },
  infBox: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 12,
  },
  typeInf: {
    ...Typography.typeInf,
    Colors: Colors.secondary,
  },
  button: {
    minHeight: 50,
  },
};

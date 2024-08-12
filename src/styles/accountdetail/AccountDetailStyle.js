import {ModalTransition} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import {Colors, Spacings, Typography} from '../../styles';
import {Button, Dimensions} from 'react-native';
import {jsiConfigureProps} from 'react-native-reanimated/lib/typescript/core';
const {width, height} = Dimensions.get('window');
const avtSize = width * 0.32;
const avtRadius = avtSize / 2;
const changeBtnSize = avtSize / 3;
const changeBtnRadius = changeBtnSize / 2;
export const accountDetailStyle = {
  container: {
    flex: 1,
    height: 1000,
    backgroundColor: '#FFFFFF',
    padding: Spacings.lg,
  },
  headerContainer: {
    height: Spacings.xl,
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
    height: 50,
  },
};

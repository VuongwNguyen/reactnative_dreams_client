import {Colors} from '../app/Colors';
import {Spacings} from '../app/Spacings';
import {Typography} from '../app/Typographys';

export const privacySettingStyle = {
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },

  bodyContainer: {
    flex: 1,
    gap: 30,
    padding: 16,
  },
  desc: {
    marginTop: Spacings.lg,
    ...Typography.privacySettingDesc,
    color: Colors.black,
  },
};

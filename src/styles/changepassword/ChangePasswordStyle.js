import {Dimensions} from 'react-native';
import {Colors, Spacings, Typography} from '../';
export const changePasswordStyle = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: Spacings.lg,
  },
  headerContainer: {
    height: Spacings.xl,
  },
  spacingHeight: {
    padding: Spacings.lg,
  },
  bodyContainer: {
    flexDirection: 'column',
    gap: 30,
  },
  textContanier: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: Spacings.lg,
  },
  textTitle: {
    ...Typography.title,
    color: 'black',
  },
  textSub: {
    ...Typography.bsdDescription,
    color: Colors.secondary,
  },
  input: {
    minHeight: 50,
    maxHeight: 60,
    justifyContent: 'center',
  },
  inputGroup: {
    gap: 15,
  },
  button: {
    marginTop: 30,
    height: 50,
  },
  errorText: {
    fontSize: 12,
    marginTop: Spacings.xs,
    marginBottom: Spacings.sm,
    color: Colors.error,
  },
};

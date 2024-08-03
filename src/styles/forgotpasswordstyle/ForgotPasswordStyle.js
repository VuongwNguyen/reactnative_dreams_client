import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const forgotPasswordStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 35,
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '600',
    color: 'black',
  },
  spacingHeight: {
    height: 40,
  },
  formContainer: {
    flexDirection: 'column',
    gap: 30,
    marginLeft: 16,
    marginRight: 16,
  },
  textContanier: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 30,
  },
  textTitle: {
    fontSize: 30,
    letterSpacing: 0,
    fontWeight: '800',
    color: 'black',
  },
  textSub: {
    fontSize: 16,
    lineHeight: 25,
    color: '#6c757d',
    letterSpacing: 0,
  },
  input: {
    height: height * 0.073,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0CBBF0',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: '100%',
    height: 70,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
};

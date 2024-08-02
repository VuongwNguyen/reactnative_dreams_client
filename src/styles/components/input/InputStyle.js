import {StyleSheet} from 'react-native';
import {Spacings} from '../../';

export const AppInputStyle = StyleSheet.create({
  label: {
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0,
    left: Spacings.xs,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
  container: {
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingLeft: Spacings.xs,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacings.xs,
  },
});

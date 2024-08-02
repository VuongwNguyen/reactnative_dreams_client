import {StyleSheet} from 'react-native';

export const AppInputStyle = StyleSheet.create({
  label: {
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0,
    left: 4,
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
    paddingLeft: 4,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});
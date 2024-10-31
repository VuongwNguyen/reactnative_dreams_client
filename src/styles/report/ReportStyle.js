import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts, Spacings, Typography} from '../';

export const reportStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    padding: 20,
  },
  reasonContainer: {
    gap: 20,
  },
  itemContainer: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  itemUnselected: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
  },
  itemSelected: {
    backgroundColor: Colors.primary,
  },
  itemText: {
    fontFamily: Fonts.roboto.regular,
    color: 'black',
    fontSize: 15,
  },
  itemTextSelected: {
    fontFamily: Fonts.roboto.medium,
    color: 'white',
    fontSize: 15,
  },
  reasonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  titleText: {
    fontFamily: Fonts.roboto.bold,
    color: 'black',
    fontSize: 18,
  },
  descContainer: {
    marginTop: 35,
    gap: 15,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    minHeight: 150,
    backgroundColor: '#FAF9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D7D9DA',
    textAlignVertical: 'top',
    fontFamily: Fonts.roboto.regular,
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});

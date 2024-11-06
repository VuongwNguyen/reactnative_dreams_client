import {StyleSheet} from 'react-native';
import {Colors} from '../app/Colors';

export const HomeStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 21,
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  wraperInputSearch: {
    flex: 1,
    position: 'relative',
  },
  inputSearch: {
    width: '95%',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    borderColor: '#6c757d',
    borderWidth: 1,
    backgroundColor: '#fff',
    fontSize: 15,
    paddingHorizontal: 45,
  },
  iconSearch: {
    position: 'absolute',
    left: 15,
    top: -32,
  },
  iconButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 999,
  },
  search: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
});

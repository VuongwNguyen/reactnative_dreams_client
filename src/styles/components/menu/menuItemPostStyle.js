import {StyleSheet} from 'react-native';
import {Colors} from './../../../styles';

export const menuItemPostStyle = StyleSheet.create({
  headerMoreContainer:{
    backgroundColor: 'white',
    width: 120,
    position: 'absolute',
    right: 30,
    top: 10,
    padding: 10,
    gap: 10,
    borderRadius: 10,
    borderColor: Colors.secondary,
    elevation: 8,
  },
  itemText:{
    color:'black',
  },
  itemTextDelete:{
    color:'red',
  },
});

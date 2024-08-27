import {StyleSheet} from 'react-native';
const DropDownTextStyle = StyleSheet.create({
  container: {
    width: '100%',
    marginTop:10,
    marginHorizontal: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    alignSelf:'center',
    flex: 1,
  },
  iconDrop: {
    width: 30,
    height: 30,
    resizeMode: 'center',
  },
  content: {
    fontSize: 16,
    color: 'black',
  },
  row:{
    flexDirection:'row'
  }
});
export default DropDownTextStyle;

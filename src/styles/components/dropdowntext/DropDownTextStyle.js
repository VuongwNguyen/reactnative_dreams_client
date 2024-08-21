import {StyleSheet} from 'react-native';
const DropDownTextStyle = StyleSheet.create({
  container: {
    width: '100%',
    marginTop:10
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
    alignSelf:'center',
    flex: 1,
  },
  iconDrop: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
    resizeMode: 'center',
  },
  content: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 20,
  },
  row:{
    flexDirection:'row'
  }
});
export default DropDownTextStyle;

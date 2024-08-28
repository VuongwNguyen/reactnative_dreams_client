import { StyleSheet} from 'react-native';
import {Colors} from '../';

export const NotificationSettingStyle = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.background,
    paddingTop:10,
    paddingHorizontal:10
  },
  title:{
    flex:1,
    fontSize:16,
    color:'black'
  },
  row:{
    flexDirection:'row',
  },
  content:{
    paddingHorizontal:20,
    paddingTop:20,
    gap:5
  }
});

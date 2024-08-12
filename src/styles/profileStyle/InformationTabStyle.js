import { StyleSheet } from 'react-native'
import { Typography } from '../app/Typographys'
export const InfomationTabStyle = StyleSheet.create({
  container:{
    flex:1,
  },
  rowContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  itemContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    paddingVertical:12
  },
  icon:{
    width:24,
    height:24
  },
  title:{
    ...Typography.cmtName,
  },
  value:{
    ...Typography.cmtName,
    color:'black'
  }
})
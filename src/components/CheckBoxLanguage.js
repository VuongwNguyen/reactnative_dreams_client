import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../styles'

const CheckBoxLanguage = (props) => {
  const {isCheck = true, onPress, positionStyle} = props
  return (
    <TouchableOpacity onPress={() => onPress(!isCheck)} style={[styles.container, positionStyle]}>
      {isCheck && <View style={styles.dot}/>}
    </TouchableOpacity>
  )
}

export default CheckBoxLanguage

const styles = StyleSheet.create({
  container: {
    width:20,
    height:20,
    borderRadius:20,
    borderWidth:1,
    borderColor: 'black',
    justifyContent:'center'
  },
  dot:{
    width:14,
    height:14,
    borderRadius:20,
    alignSelf:'center',
    backgroundColor:Colors.primary
  }
})
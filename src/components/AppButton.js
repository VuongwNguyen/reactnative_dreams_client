import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppButtonStyle } from '../styles/components/button/AppButtonStyle'

const AppButton = (props) => {
  const { title='', onPress, positionStyle } = props
  return (
    <TouchableOpacity style={[positionStyle, AppButtonStyle.container]} onPress={onPress}>
      <Text style={AppButtonStyle.label}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton
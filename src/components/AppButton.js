import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AuthButtonStyle } from '../styles/components/button/AppButtonStyle'

const AuthButton = (props) => {
  const { title, onPress, positionStyle } = props
  return (
    <TouchableOpacity style={[positionStyle, AuthButtonStyle.container]} onPress={onPress}>
      <Text style={AuthButtonStyle.label}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AuthButton
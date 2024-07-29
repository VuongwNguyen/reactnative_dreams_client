import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const AuthButton = (props) => {
  const { title, onPress, positionStyle } = props
  return (
    <TouchableOpacity style={[positionStyle, styles.container]} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AuthButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0CBBF0',
    flex: 1,
    maxHeight: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
})
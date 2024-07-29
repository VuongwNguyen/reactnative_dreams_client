import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../styles'

const AppInput = (props) => {
  const { value, setValue, placeholder, isPassword = false ,positionStyle} = props
  const [canReadPass, setCanReadPass] = useState(isPassword)
  return (
    <View style={[positionStyle,styles.container]}>
      <Text>{value.length > 0 && placeholder}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, height: 40 }}
          value={value}
          placeholder={placeholder}
          onChangeText={setValue}
          secureTextEntry={canReadPass}
        >
        </TextInput>
        {
          isPassword && <TouchableOpacity onPress={() => setCanReadPass(!canReadPass)}>
            <Image style={{ width: 20, height: 20 }} source={!canReadPass ? require('../assets/eye-open.png') : require('../assets/eye-close.png')} />
          </TouchableOpacity>
        }
      </View>
      <View style={{ height: 1, width: '100%', backgroundColor: '#D9D9D9' }}></View>
    </View>
  )
}

export default AppInput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.background.backgroundColor,
  }
})
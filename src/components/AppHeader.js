import {Text, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import React from 'react'
import { Assets } from '../styles';
import { AppHeaderStyle } from '../styles/components/AppHeaderStyle';

const AppHeader = (props) => {
  const { title, goBack, rightButton, rightButtonAction, rightButtonTitle } = props
  return (
    <View style={AppHeaderStyle.container}>
      <TouchableOpacity onPress={goBack}>
        <Feather name={Assets.icon.back} size={24} color="black" />
      </TouchableOpacity>
      <Text style={AppHeaderStyle.title}>{title}</Text>
      {rightButton &&
        <TouchableOpacity style={AppHeaderStyle.rightButton} onPress={rightButtonAction || (() => { })}>
          <Text style={AppHeaderStyle.titleRightButton}>{rightButtonTitle}</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default AppHeader
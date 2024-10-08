import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import {Assets, Sizing, Typography} from '../styles';
import {AppHeaderStyle} from '../styles/components/header/HeaderStyle';
import {useNavigation} from '@react-navigation/native';
const AppHeader = props => {
  const {
    title = '',
    rightButton = false,
    rightButtonAction = () => {},
    rightButtonTitle = '',
  } = props;
  const navigation = useNavigation();
  return (
    <View style={AppHeaderStyle.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Feather name={Assets.icon.back} size={Sizing.lg} color="black" />
      </TouchableOpacity>
      <Text style={Typography.navTitle}>{title}</Text>
      {rightButton ? (
        <TouchableOpacity
          style={AppHeaderStyle.rightButton}
          onPress={rightButtonAction}>
          <Text style={AppHeaderStyle.titleRightButton}>
            {rightButtonTitle}
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default AppHeader;

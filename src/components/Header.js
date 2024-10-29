import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Assets, Typography} from '../styles';
import {AppHeaderStyle} from '../styles/components/header/HeaderStyle';
import {useNavigation} from '@react-navigation/native';
import { stackName } from '../navigations/screens';
const AppHeader = props => {
  const {
    title = '',
    rightButton = false,
    rightButtonAction = () => {},
    rightButtonTitle = '',
    isDisabled = false,
    onGoBack = () => {},
    editIcon = false,
  } = props;
  const navigation = useNavigation();

  return (
    <View style={AppHeaderStyle.container}>
      <TouchableOpacity
        onPress={() => {
          onGoBack();
          navigation.goBack();
        }}>
        <Image source={Assets.icons.arrowLeft} style={AppHeaderStyle.icon} />
      </TouchableOpacity>
      <Text style={Typography.navTitle}>{title}</Text>
      {rightButton ? (
        <TouchableOpacity
          disabled={isDisabled}
          style={
            isDisabled
              ? AppHeaderStyle.disabledButton
              : AppHeaderStyle.rightButton
          }
          onPress={rightButtonAction}>
          {rightButtonTitle && (
            <Text
              style={[
                AppHeaderStyle.titleRightButton,
                isDisabled && {color: 'black'},
              ]}>
              {rightButtonTitle}
            </Text>
          )}
        </TouchableOpacity>
      ) : editIcon ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(stackName.accountDetail.name);
          }}>
          <Image source={Assets.icons.edit} style={AppHeaderStyle.icon} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default AppHeader;

import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';

import {useTranslation} from 'react-i18next';

import FormikForm from './FormikForm';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppHeader from '../../components/Header';

const ChangePasswordScreen = () => {
  const {t} = useTranslation();
  const goBackScreen = () => {};
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={changePasswordStyle.container}>
        <View style={changePasswordStyle.headerContainer}>
          <AppHeader
            title={t('changePwScreen.changePwTitle')}
            goBack={goBackScreen}
          />
        </View>

        <View style={changePasswordStyle.spacingHeight} />

        <View style={changePasswordStyle.bodyContainer}>
          <View style={changePasswordStyle.textContanier}>
            <Text style={changePasswordStyle.textTitle}>
              {t('changePwScreen.changePw')}
            </Text>
            <Text style={changePasswordStyle.textSub}>
              {t('changePwScreen.pwRule')}
            </Text>
          </View>
          <FormikForm />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChangePasswordScreen;

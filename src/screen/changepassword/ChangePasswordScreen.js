import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';

import {useTranslation} from 'react-i18next';

import FormikForm from './FormikForm';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

const ChangePasswordScreen = () => {
  const {t} = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={changePasswordStyle.container}>
        <AppHeader title={t('changePwScreen.changePwTitle')} />

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

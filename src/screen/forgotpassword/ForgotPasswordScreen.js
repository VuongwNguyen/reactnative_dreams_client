import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {forgotPasswordStyles} from '../../styles/forgotpasswordstyle/ForgotPasswordStyle';
import {useTranslation} from 'react-i18next';
import {FormikFG} from './FormikForm';
import AppHeader from '../../components/Header';

const ForgotPasswordScreen = () => {
  const {t} = useTranslation();
  return (
    <View style={forgotPasswordStyles.container}>
      <AppHeader title={t('forgotPasswordScreen.headerText')} leftButton={true} />
      <View style={forgotPasswordStyles.spacingHeight} />
      <FormikFG />
    </View>
  );
};

export default ForgotPasswordScreen;

import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Assets} from '../../styles';
import {forgotPasswordStyles} from '../../styles/forgotpasswordstyle/ForgotPasswordStyle';
import {useTranslation} from 'react-i18next';
import {FormikFG} from './FormikForm';

const ForgotPasswordScreen = () => {
  const {t} = useTranslation();
  return (
    <View style={forgotPasswordStyles.container}>
      <View style={forgotPasswordStyles.headerContainer}>
        <TouchableOpacity>
          <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
        </TouchableOpacity>
        <Text style={forgotPasswordStyles.headerText}>
          {t('forgotPasswordScreen.headerText')}
        </Text>
      </View>
      <View style={forgotPasswordStyles.spacingHeight} />
      <FormikFG />
    </View>
  );
};

export default ForgotPasswordScreen;

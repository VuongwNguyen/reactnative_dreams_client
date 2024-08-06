import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {Assets} from '../../styles';
import {useTranslation} from 'react-i18next';
import FormikForm from './FormikForm';
import { LoginStyle } from '../../styles/loginStyle/LoginStyle';

const LoginScreen = () => {
  const {t} = useTranslation();
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={RegisterStyle.container}>
          <View style={RegisterStyle.containerHeader}>
            <Image style={RegisterStyle.logo} source={Assets.image.logo} />
            <Text style={RegisterStyle.headerText}>
              {t('loginScreen.welcome')}
            </Text>
            <Text>{t('loginScreen.subTitle')}</Text>
            <Text>{t('loginScreen.title')}</Text>
          </View>
          <View style={{flex: 1}}>
            <FormikForm />
          </View>
          <View style={RegisterStyle.containerLink}>
            <Text>{t('loginScreen.notAccount')}</Text>
            <Text style={RegisterStyle.link}>{t('loginScreen.login')}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

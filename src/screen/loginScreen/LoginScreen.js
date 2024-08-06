import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Assets} from '../../styles';
import {useTranslation} from 'react-i18next';
import FormikForm from './FormikForm';
import { LoginStyle } from '../../styles/loginStyle/LoginStyle';

const LoginScreen = () => {
  const {t} = useTranslation();
  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={LoginStyle.container}>
          <View style={LoginStyle.containerHeader}>
            <Image style={LoginStyle.logo} source={Assets.image.logo} />
            <Text style={LoginStyle.headerText}>
              {t('loginScreen.welcome')}
            </Text>
            <Text style={LoginStyle.subTitle}>{t('loginScreen.subTitle')}</Text>
            <Text style={LoginStyle.titleText}>{t('loginScreen.title')}</Text>
          </View>
          <View style={{flex: 1}}>
            <FormikForm />
          </View>
          <View style={LoginStyle.containerLink}>
            <Text>{t('loginScreen.notAccount')}</Text>
            <Text style={LoginStyle.link}>{t('loginScreen.login')}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

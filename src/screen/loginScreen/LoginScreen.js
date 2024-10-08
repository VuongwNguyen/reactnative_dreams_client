import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Assets} from '../../styles';
import {useTranslation} from 'react-i18next';
import FormikForm from './FormikForm';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';
import {stackName} from '../../navigations/screens';

const LoginScreen = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  return (
    <KeyboardAvoidingView style={LoginStyle.viewContainer}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
        <View style={LoginStyle.container}>
          <View style={LoginStyle.containerHeader}>
            <Image style={LoginStyle.logo} source={Assets.image.logo} />
            <Text style={LoginStyle.headerText}>
              {t('loginScreen.welcome')}
            </Text>
            <Text style={LoginStyle.subTitle}>{t('loginScreen.subTitle')}</Text>
            <Text style={LoginStyle.titleText}>{t('loginScreen.title')}</Text>
          </View>
          <View>
            <FormikForm />
          </View>
          <View style={LoginStyle.containerLink}>
            <Text>{t('loginScreen.notAccount')}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(stackName.register.name);
              }}>
              <Text style={LoginStyle.link}>{t('loginScreen.register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

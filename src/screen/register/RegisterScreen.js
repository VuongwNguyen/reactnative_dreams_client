import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import React from 'react';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import MyForm from './FormikForm';
import {stackName} from '../../navigations/screens';
import {useSelector} from 'react-redux';

const RegisterScreen = props => {
  const {t} = useTranslation();
  const {ggSigninLoading} = useSelector(state => state.account);
  const {navigation} = props;
  return (
    <KeyboardAvoidingView style={RegisterStyle.viewContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={RegisterStyle.container}>
          <View style={RegisterStyle.containerHeader}>
            <Image style={RegisterStyle.logo} source={Assets.image.logo} />
            <Text style={RegisterStyle.headerText}>
              {t('register.welcome')}
            </Text>
            <Text>{t('register.createAnAccount')}</Text>
          </View>
          <View>
            <MyForm />
          </View>
          <View style={RegisterStyle.containerLink}>
            <Text>{t('register.alreadyHaveAnAccount')}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(stackName.login.name);
              }}>
              <Text style={RegisterStyle.link}>{t('register.login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {ggSigninLoading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {Assets} from '../../styles';
import {useTranslation} from 'react-i18next';
import MyForm from './FormikForm';
import {stackName} from '../../navigations/screens';

const RegisterScreen = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
        <View style={RegisterStyle.container}>
          <View style={RegisterStyle.containerHeader}>
            <Image style={RegisterStyle.logo} source={Assets.image.logo} />
            <Text style={RegisterStyle.headerText}>
              {t('register.welcome')}
            </Text>
            <Text>{t('register.createAnAccount')}</Text>
          </View>
          <View style={{flex: 1}}>
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
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

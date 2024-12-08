import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import FormikForm from './FormikForm';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';
import {stackName} from '../../navigations/screens';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';

const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const {ggSigninLoading} = useSelector(state => state.account);
  const [github, setGithub] = useState(false);

  return (
    <KeyboardAvoidingView style={LoginStyle.viewContainer}>
      {github ? (
        <View>
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Text>Huỷ</Text>
          </TouchableOpacity>
          <WebView
            source={{uri: ''}}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
          <View style={LoginStyle.container}>
            <View style={LoginStyle.containerHeader}>
              <Image style={LoginStyle.logo} source={Assets.image.logo} />
              <Text style={LoginStyle.headerText}>
                {t('loginScreen.welcome')}
              </Text>
              <Text style={LoginStyle.subTitle}>
                {t('loginScreen.subTitle')}
              </Text>
              <Text style={LoginStyle.titleText}>{t('loginScreen.title')}</Text>
            </View>
            <View>
              <FormikForm setGithub={setGithub} />
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
      )}
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

export default LoginScreen;

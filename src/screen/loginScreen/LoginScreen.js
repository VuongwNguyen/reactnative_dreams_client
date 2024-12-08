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
import {useDispatch, useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {APIAuthGithub} from '../../store/api/AccountAPI';
import queryString from 'query-string';

const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {ggSigninLoading} = useSelector(state => state.account);
  const [github, setGithub] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');
  const uri =
    'https://github.com/login/oauth/authorize?client_id=Ov23li7sDDRAuyabl4JK&redirect_uri=https://dreams-server-bmd-4sx0.onrender.com/api&scope=read:user';

  const handleNavigationStateChange = event => {
    // Kiểm tra nếu URL chứa code
    if (event.url !== processedUrl && event.url.includes('?code=')) {
      setGithub(false);
      setProcessedUrl(event.url); // Lưu URL để ngăn xử lý lặp lại
      const parsed = queryString.parseUrl(event.url);
      const code = parsed.query.code;

      if (code) {
        // Gửi code này về server backend của bạn để lấy access token
        dispatch(APIAuthGithub({code})).unwrap();
      }
    }
  };

  return (
    <KeyboardAvoidingView style={LoginStyle.viewContainer}>
      {github ? (
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              padding: 10,
              backgroundColor: 'red',
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            onPress={() => setGithub(false)}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontStyle: 'normal',
              }}>
              Huỷ
            </Text>
          </TouchableOpacity>
          <WebView
            onNavigationStateChange={handleNavigationStateChange}
            source={{uri: uri}}
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

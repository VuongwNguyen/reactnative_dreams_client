import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/Input';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {loginSchema} from '../../configs/validateSchema/LoginSchema';
import {stackName} from '../../navigations/screens';
import {APIAuthThirdPartner, APILogin} from '../../store/api/AccountAPI';
import {Assets, Typography} from '../../styles';
import {ButtonStyle} from '../../styles/components/button/ButtonStyle';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const FormikForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.account);
  const {t} = useTranslation();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '650950443769-ogc8o7mqb2viqkrct0ls5vqtt4ajei9n.apps.googleusercontent.com',
    });
  }, []);
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult = await GoogleSignin.signIn();
      // console.log('Google Sign-In Result:', signInResult);
      const idToken = signInResult.data.idToken;
      if (!idToken) {
        throw new Error('Không thể lấy được ID token từ Google Sign-In.');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      // console.log('Google Sign-In thành công:', userCredential);
      const body = {
        email: userCredential.user.email,
        first_name: userCredential.additionalUserInfo.profile?.family_name,
        last_name: userCredential.additionalUserInfo.profile?.given_name,
        avatar: userCredential.user?.photoURL,
        partner_id: userCredential.user.uid,
        password: '',
        phone: userCredential.user.phoneNumber,
      };
      // console.log(body);
      dispatch(APIAuthThirdPartner(body))
        .unwrap()
        .then(res => {
          Alert.alert('Đăng nhập thành công với Google!');
          
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    } catch (error) {
      console.error('Lỗi khi đăng nhập với Google:', error.message);
      Alert.alert('Đăng nhập thất bại:', error.message);
    }
  }
  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      emailOrPhoneNumber: '',
      password: '',
    },
    loginSchema,
    (val, {resetForm}) => {
      console.log('ssssss');

      dispatch(
        APILogin({
          UserIF: val.emailOrPhoneNumber,
          password: val.password,
        }),
      )
        .unwrap()
        .then(res => {
          // resetForm();
          // ToastAndroid.show('Login success', 1000);
        })
        .catch(err => {
          // ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    },
  );

  return (
    <View style={LoginStyle.containerForm}>
      <View>
        <Input
          placeholder={t('loginScreen.emailOrPhoneNumber')}
          value={values.emailOrPhoneNumber}
          setValue={handleChange('emailOrPhoneNumber')}
        />
        {errors.emailOrPhoneNumber && touched.emailOrPhoneNumber && (
          <Text style={Typography.errorText}>{errors.emailOrPhoneNumber}</Text>
        )}
      </View>
      <View>
        <Input
          placeholder={t('loginScreen.password')}
          isPassword
          value={values.password}
          setValue={handleChange('password')}
        />
        {errors.password && touched.password && (
          <Text style={Typography.errorText}>{errors.password}</Text>
        )}
      </View>
      <View style={[LoginStyle.rowContainer, {justifyContent: 'flex-end'}]}>
        {/* <TouchableOpacity
          style={LoginStyle.checkBoxContainer}
          onPress={() => setIsRememberMe(!isRememberMe)}>
          <View style={LoginStyle.dot}>
            {isRememberMe && <View style={LoginStyle.checkBox} />}
          </View>
          <Text>{t('loginScreen.remmberMe')}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate(stackName.forgotPassword.name)}
          style={{}}>
          <Text style={LoginStyle.link}>{t('loginScreen.forgotPassword')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={ButtonStyle.container}
        disabled={loading}
        onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color={'white'} size={20} />
        ) : (
          <Text style={ButtonStyle.title}>{t('loginScreen.login')}</Text>
        )}
      </TouchableOpacity>
      <View style={{gap: 20}}>
        <Text style={LoginStyle.orText}>{t('loginScreen.or')}</Text>
        <View style={LoginStyle.differentLoginContainer}>
          <TouchableOpacity onPress={onGoogleButtonPress}>
            <Image style={LoginStyle.image} source={Assets.image.google} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={LoginStyle.image} source={Assets.image.github} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FormikForm;

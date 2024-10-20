import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
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
import {APILogin} from '../../store/api/AccountAPI';
import {Assets, Typography} from '../../styles';
import {ButtonStyle} from '../../styles/components/button/ButtonStyle';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';

const FormikForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.account);
  const {t} = useTranslation();
  const [isRememberMe, setIsRememberMe] = useState(false);
  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      emailOrPhoneNumber: '',
      password: '',
    },
    loginSchema,
    (val, {resetForm}) => {
      dispatch(
        APILogin({
          UserIF: val.emailOrPhoneNumber,
          password: val.password,
        }),
      )
        .unwrap()
        .then(res => {
          if (isRememberMe) {
          }
          resetForm();
          ToastAndroid.show('Login success', 1000);
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
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
      <View style={LoginStyle.rowContainer}>
        <TouchableOpacity
          style={LoginStyle.checkBoxContainer}
          onPress={() => setIsRememberMe(!isRememberMe)}>
          <View style={LoginStyle.dot}>
            {isRememberMe && <View style={LoginStyle.checkBox} />}
          </View>
          <Text>{t('loginScreen.remmberMe')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(stackName.forgotPassword.name)}>
          <Text style={LoginStyle.link}>{t('loginScreen.forgotPassword')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={ButtonStyle.container} onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color={'white'} size={20} />
        ) : (
          <Text style={ButtonStyle.title}>{t('loginScreen.login')}</Text>
        )}
      </TouchableOpacity>
      <View style={{gap: 20}}>
        <Text style={LoginStyle.orText}>{t('loginScreen.or')}</Text>
        <View style={LoginStyle.differentLoginContainer}>
          <TouchableOpacity>
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

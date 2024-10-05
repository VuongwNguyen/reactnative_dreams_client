import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {Assets, Typography} from '../../styles';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';
import {loginSchema} from '../../configs/validateSchema/LoginSchema';
import {useDispatch} from 'react-redux';
import {APILogin} from '../../store/api/AccountAPI';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';

const FormikForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          navigation.navigate(stackName.bottomTab.name);
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    },
  );

  return (
    <View style={RegisterStyle.containerForm}>
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
      <Button onPress={handleSubmit} title={t('loginScreen.login')} />
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

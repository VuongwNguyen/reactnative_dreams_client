import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {registerSchema} from '../../configs/validateSchema/registerSchema';
import {Assets, Typography} from '../../styles';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';

const FormikForm = () => {
  const {t} = useTranslation();
  const [isRememberMe, setIsRememberMe] = useState(false);
  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      email: '',
      password: '',
    },
    registerSchema,
    (val, {resetForm}) => {
      console.log(val);
      resetForm();
    },
  );

  return (
    <View style={RegisterStyle.containerForm}>
      <View>
        <Input
          placeholder="Email"
          value={values.email}
          setValue={handleChange('email')}
        />
        {errors.email && (
          <Text style={Typography.errorText}>{errors.email}</Text>
        )}
      </View>
      <View>
        <Input
          placeholder={t('loginScreen.password')}
          isPassword
          value={values.password}
          setValue={handleChange('password')}
        />
        {errors.password && (
          <Text style={Typography.errorText}>{errors.password}</Text>
        )}
      </View>
      <View style={LoginStyle.rowContainer}>
        <View style={LoginStyle.row}>
          <TouchableOpacity
            style={LoginStyle.checkBoxContainer}
            onPress={() => setIsRememberMe(!isRememberMe)}>
            {isRememberMe && <View style={LoginStyle.checkBox} />}
          </TouchableOpacity>
          <Text>{'Remember me'}</Text>
        </View>
        <Text style={LoginStyle.link}>Forgot password?</Text>
      </View>
      <Button onPress={handleSubmit} title={t('loginScreen.login')} />
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
  );
};

export default FormikForm;

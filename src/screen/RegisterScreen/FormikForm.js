import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {registerSchema} from '../../configs/validateSchema/registerSchema';
import {Typography} from '../../styles';

const RegisterForm = () => {
  const {t} = useTranslation();
  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    registerSchema,
    (val, {resetForm}) => {
      console.log(val);
      resetForm();
    },
  );

  return (
    <View style={RegisterStyle.containerForm}>
      <View style={RegisterStyle.groupNameContainer}>
        <View style={RegisterStyle.groupName}>
          <Input
            placeholder={t('register.lastName')}
            value={values.lastName}
            setValue={handleChange('lastName')}
          />
          {errors.lastName && (
            <Text style={Typography.errorText}>{errors.lastName}</Text>
          )}
        </View>
        <View style={RegisterStyle.groupName}>
          <Input
            placeholder={t('register.firstName')}
            value={values.firstName}
            setValue={handleChange('firstName')}
          />
          {errors.firstName && (
            <Text style={Typography.errorText}>{errors.firstName}</Text>
          )}
        </View>
      </View>
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
          placeholder={t('register.phoneNumber')}
          value={values.phoneNumber}
          setValue={handleChange('phoneNumber')}
        />
        {errors.phoneNumber && (
          <Text style={Typography.errorText}>{errors.phoneNumber}</Text>
        )}
      </View>
      <View>
        <Input
          placeholder={t('register.password')}
          isPassword
          value={values.password}
          setValue={handleChange('password')}
        />
        {errors.password && (
          <Text style={Typography.errorText}>{errors.password}</Text>
        )}
      </View>
      <View>
        <Input
          placeholder={t('register.confirmPassword')}
          isPassword
          value={values.confirmPassword}
          setValue={handleChange('confirmPassword')}
        />
        {errors.confirmPassword && (
          <Text style={Typography.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      <Button
        onPress={handleSubmit}
        title={t('register.register')}
      />
    </View>
  );
};

export default RegisterForm;

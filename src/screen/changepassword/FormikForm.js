import React from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/Input';
import AppButton from '../../components/Button';
import {useTranslation} from 'react-i18next';
import {Typography} from '../../styles';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {ChangePasswordSchema} from '../../configs/validateSchema/ChangePasswordSchema';
import {useDispatch} from 'react-redux';
import {APIResetPassword} from '../../store/api/AccountAPI';
const FormikForm = () => {
  const {t} = useTranslation();
  const emailReset = 'kimchi220204@gmail.com';

  const dispatch = useDispatch();
  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
    },
    ChangePasswordSchema,
    (values, {resetForm}) => {
      dispatch(
        APIResetPassword({
          email: emailReset,
          newPassword: values.newPassword,
        }),
      )
        .unwrap()
        .then(res => {
          ToastAndroid.show('Cập nhật mật khẩu thành công', ToastAndroid.SHORT);
          resetForm();
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    },
  );

  return (
    <View style={changePasswordStyle.inputGroup}>
      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.currentPassword}
          setValue={handleChange('currentPassword')}
          placeholder={t('changePwScreen.currentPw')}
        />
        {errors.currentPassword && (
          <Text style={Typography.errorText}>{errors.currentPassword}</Text>
        )}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.newPassword}
          setValue={handleChange('newPassword')}
          placeholder={t('changePwScreen.newPw')}
        />
        {errors.newPassword && (
          <Text style={Typography.errorText}>{errors.newPassword}</Text>
        )}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.passwordConfirm}
          setValue={handleChange('passwordConfirm')}
          placeholder={t('changePwScreen.confirmNewPw')}
        />
        {errors.passwordConfirm && (
          <Text style={Typography.errorText}>{errors.passwordConfirm}</Text>
        )}
      </View>

      <View style={changePasswordStyle.button}>
        <AppButton title={t('changePwScreen.save')} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default FormikForm;

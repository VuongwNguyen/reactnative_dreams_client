import React from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/Input';
import AppButton from '../../components/Button';
import {useTranslation} from 'react-i18next';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {ChangeNewPasswordSchema} from '../../configs/validateSchema/ChangeNewPasswordSchema';
import {useDispatch} from 'react-redux';
import {APIResetPassword} from '../../store/api/AccountAPI';
const FormikForm = () => {
  const {t} = useTranslation();
  const emailReset = 'kimchi220204@gmail.com';

  const dispatch = useDispatch();

  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      newPw: '',
      newPwConfirm: '',
    },
    ChangeNewPasswordSchema,
    (values, {resetForm}) => {
      dispatch(
        APIResetPassword({
          email: emailReset,
          newPassword: values.newPw,
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
          value={values.newPw}
          setValue={handleChange('newPw')}
          placeholder={t('changePwScreen.newPw')}
        />
        {errors.newPw && (
          <Text style={changePasswordStyle.errorText}>{errors.newPw}</Text>
        )}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.newPwConfirm}
          setValue={handleChange('newPwConfirm')}
          placeholder={t('changePwScreen.confirmNewPw')}
        />
        {errors.newPwConfirm && (
          <Text style={changePasswordStyle.errorText}>
            {errors.newPwConfirm}
          </Text>
        )}
      </View>

      <View style={changePasswordStyle.button}>
        <AppButton title={t('changePwScreen.save')} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default FormikForm;

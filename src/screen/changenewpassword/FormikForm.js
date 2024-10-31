import React from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { changePasswordStyle } from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/Input';
import AppButton from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { useFormikH } from '../../configs/hooks/useFormikH';
import { ChangeNewPasswordSchema } from '../../configs/validateSchema/ChangeNewPasswordSchema';
import { useDispatch } from 'react-redux';
import { APIResetPassword } from '../../store/api/AccountAPI';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { stackName } from '../../navigations/screens';
const FormikForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const email = route?.params?.email;

  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, errors, touched } = useFormikH(
    {
      newPw: '',
      newPwConfirm: '',
    },
    ChangeNewPasswordSchema,
    (values, { resetForm }) => {
      dispatch(
        APIResetPassword({
          email: email,
          newPassword: values.newPw,
        }),
      )
        .unwrap()
        .then(res => {
          ToastAndroid.show('Cập nhật mật khẩu thành công', ToastAndroid.SHORT);
          resetForm();
          navigation.navigate(stackName.login.name);
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
          isPassword
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
          isPassword
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

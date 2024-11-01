import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { forgotPasswordStyles } from '../../styles/forgotpasswordstyle/ForgotPasswordStyle';
import AppInput from '../../components/Input';
import { useTranslation } from 'react-i18next';
import { useFormikH } from '../../configs/hooks/useFormikH';
import { forgotPasswordSchema } from '../../configs/validateSchema/forgotPasswordSchema';
import { useDispatch } from 'react-redux';
import { apiSendOtpResetPW, APIVerifyAccount } from '../../store/api/AccountAPI';
import { useNavigation } from '@react-navigation/native';
import { stackName } from '../../navigations/screens';

export const FormikFG = props => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const useAppDispatch = () => useDispatch();
  const dispatch = useAppDispatch();

  const { handleSubmit, handleChange, values, errors, touched } = useFormikH(
    {
      emailAddress: '',
    },
    forgotPasswordSchema,
    (values, { resetForm }) => {
      try {
        const body = {
          email: values.emailAddress,
        };
        dispatch(APIVerifyAccount(body))
          .unwrap()
          .then(res => {
            navigation.navigate(stackName.otp.name, {
              email: values.emailAddress,
              isForgot: true,
            });
            resetForm();
          })
          .catch(err => {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
          });
      } catch (error) {
        console.log('Error', error);
      }
    },
  );

  return (
    <View style={forgotPasswordStyles.formContainer}>
      <View style={forgotPasswordStyles.textContanier}>
        <Text style={forgotPasswordStyles.textTitle}>
          {t('forgotPasswordScreen.textTitle')}
        </Text>
        <Text style={forgotPasswordStyles.textSub}>
          {t('forgotPasswordScreen.textSub')}
        </Text>
      </View>
      <View style={forgotPasswordStyles.input}>
        <AppInput
          values={values.emailAddress}
          setValue={handleChange('emailAddress')}
          placeholder={t('forgotPasswordScreen.placeholder')}
        />
        {errors.emailAddress && (
          <Text style={forgotPasswordStyles.errorText}>
            {errors.emailAddress}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={forgotPasswordStyles.button}
        onPress={handleSubmit}>
        <Text style={forgotPasswordStyles.buttonText}>
          {t('forgotPasswordScreen.buttonText')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

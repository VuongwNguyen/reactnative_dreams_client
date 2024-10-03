import {View, Text, TouchableOpacity} from 'react-native';
import {forgotPasswordStyles} from '../../styles/forgotpasswordstyle/ForgotPasswordStyle';
import AppInput from '../../components/Input';
import {useTranslation} from 'react-i18next';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {forgotPasswordSchema} from '../../configs/validateSchema/forgotPasswordSchema';
import {useDispatch, useSelector} from 'react-redux';
import {apiSendOtpResetPW} from '../../store/api/AccountAPI';

export const FormikFG = props => {
  const {t} = useTranslation();

  const useAppDispatch = () => useDispatch();
  const useAppSelector = useSelector;
  const dispatch = useAppDispatch();

  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      emailAddress: '',
    },
    forgotPasswordSchema,
    (values, {resetForm}) => {
      try {
        const body = {
          email: values.emailAddress,
        };
        dispatch(apiSendOtpResetPW(body));
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

import * as Yup from 'yup';
import { useFormik } from "formik"
import { View, Text, TouchableOpacity } from 'react-native';
import { forgotPasswordStyles } from '../../styles/forgotpasswordstyle/ForgotPasswordStyle';
import AppInput from '../../components/Input';
import { useTranslation } from 'react-i18next';



export const FormikFG = (props) => {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        emailAddress: Yup.string().email(t("forgotPasswordScreen.errorText.invalidEmail")).required(t("forgotPasswordScreen.errorText.required")),
    })
    const formik = useFormik(
        {
            initialValues: {
                emailAddress: ''
            },
            validationSchema: validationSchema,
            onSubmit: (values, { resetForm }) => {
                console.log(values);
                resetForm();
            }
        }
    )
    const { handleSubmit, handleChange, values, errors, touched } = formik;

    return (
        <View style={forgotPasswordStyles.formContainer}>
            <View style={forgotPasswordStyles.textContanier}>
                <Text style={forgotPasswordStyles.textTitle}>{t("forgotPasswordScreen.textTitle")}</Text>
                <Text style={forgotPasswordStyles.textSub}>
                    {t("forgotPasswordScreen.textSub")}
                </Text>
            </View>
            <View style={forgotPasswordStyles.input}>
                <AppInput
                    values={values.emailAddress}
                    setValue={handleChange("emailAddress")}
                    placeholder={t("forgotPasswordScreen.placeholder")}
                />
                {
                    formik.errors.emailAddress &&
                    <Text style={forgotPasswordStyles.errorText}>{formik.errors.emailAddress}</Text>
                }
            </View>
            <TouchableOpacity style={forgotPasswordStyles.button} onPress={formik.handleSubmit}>
                <Text style={forgotPasswordStyles.buttonText}> {t("forgotPasswordScreen.buttonText")}</Text>
            </TouchableOpacity>
        </View>
    )
}
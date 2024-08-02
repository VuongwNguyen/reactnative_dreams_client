import { Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { RegisterStyle } from '../../styles/RegisterStyle/ResgisterStyle'
import { Assets } from '../../styles'
import { useTranslation } from 'react-i18next';
import { MyForm } from './MyForm';

const RegisterScreen = () => {
  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView
      style={RegisterStyle.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        style={{ flexGrow: 1 }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={RegisterStyle.containerHeader}>
          <Image style={RegisterStyle.logo} source={Assets.image.logo} />
          <Text style={RegisterStyle.headerText}>{t('welcome')}</Text>
          <Text>{t('createAnAccount')}</Text>
        </View>
        <MyForm/>
        <View style={RegisterStyle.containerLink}>
          <Text>{t('alreadyHaveAnAccount')}</Text>
          <Text style={RegisterStyle.link}>{t('login')}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen
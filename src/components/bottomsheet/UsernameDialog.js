import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
const UsernameDialog = () => {
  const {t} = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const isDisabled = !firstName || !lastName;
  return (
    <View style={bottomSheetStyle.container}>
      <View>
        <Ionicons name={Assets.icon.close} size={24} color="black" />
      </View>
      <View style={bottomSheetStyle.bodyContainer}>
        <Text style={bottomSheetStyle.titleDialog}>
          {t('usernameDialog.title')}
        </Text>
        <Text style={bottomSheetStyle.desc}>{t('usernameDialog.desc')}</Text>
        <View style={bottomSheetStyle.usernameInputGroup}>
          <TextInput
            style={[bottomSheetStyle.input, {width: '50%'}]}
            placeholder={t('usernameDialog.firstname')}
            placeholderTextColor={Colors.secondary}
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={[bottomSheetStyle.input, {width: '50%'}]}
            placeholder={t('usernameDialog.lastname')}
            placeholderTextColor={Colors.secondary}
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>
        <TouchableOpacity
          disabled={isDisabled}
          style={[bottomSheetStyle.btnContainer, isDisabled && {opacity: 0.5}]}>
          <Text style={bottomSheetStyle.btnLabel}>
            {t('usernameDialog.confirm')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UsernameDialog;

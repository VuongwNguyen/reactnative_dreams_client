import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
const NicknameDialog = () => {
  const {t} = useTranslation();
  const [nickName, setNickName] = useState('');
  const isDisabled = !nickName;
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <Image source={Assets.icons.close} style={{height: 20, width: 20}} />
        </View>
        <View style={bottomSheetStyle.bodyContainer}>
          <Text style={bottomSheetStyle.titleDialog}>
            {t('nicknameDialog.title')}
          </Text>
          <Text style={bottomSheetStyle.desc}>{t('nicknameDialog.desc')}</Text>
          <TextInput
            style={bottomSheetStyle.input}
            placeholder={t('nicknameDialog.nickname')}
            placeholderTextColor={Colors.secondary}
            value={nickName}
            onChangeText={text => setNickName(text)}
          />

          <TouchableOpacity
            disabled={isDisabled}
            style={[
              bottomSheetStyle.btnContainer,
              isDisabled && {opacity: 0.5},
            ]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('nicknameDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NicknameDialog;

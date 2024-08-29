import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';

const HometownDialog = () => {
  const {t} = useTranslation();
  const [hometown, setHometown] = useState('');
  const isDisabled = !hometown;
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <Ionicons name={Assets.icon.close} size={24} color="black" />
        </View>
        <View style={bottomSheetStyle.bodyContainer}>
          <Text style={bottomSheetStyle.titleDialog}>
            {t('hometownDialog.title')}
          </Text>
          <Text style={bottomSheetStyle.desc}>{t('hometownDialog.desc')}</Text>
          <TextInput
            style={bottomSheetStyle.input}
            placeholder={t('hometownDialog.placeholder')}
            placeholderTextColor={Colors.secondary}
            value={hometown}
            onChangeText={text => setHometown(text)}
          />

          <TouchableOpacity
            disabled={isDisabled}
            style={[
              bottomSheetStyle.btnContainer,
              isDisabled && {opacity: 0.5},
            ]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('hometownDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HometownDialog;

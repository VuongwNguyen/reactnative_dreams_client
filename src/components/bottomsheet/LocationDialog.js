import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';

const LocationDialog = () => {
  const {t} = useTranslation();
  const [location, setLocation] = useState('');
  const isDisable = !location;
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <Image source={Assets.icons.close} style={{height: 20, width: 20}} />
        </View>
        <View style={bottomSheetStyle.bodyContainer}>
          <Text style={bottomSheetStyle.titleDialog}>
            {t('locationDialog.title')}
          </Text>
          <Text style={bottomSheetStyle.desc}>{t('locationDialog.desc')}</Text>
          <TextInput
            style={bottomSheetStyle.input}
            placeholder={t('locationDialog.placeholder')}
            placeholderTextColor={Colors.secondary}
            value={location}
            onChangeText={text => setLocation(text)}
          />

          <TouchableOpacity
            disabled={isDisable}
            style={[
              bottomSheetStyle.btnContainer,
              isDisable && {opacity: 0.5},
            ]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('locationDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationDialog;

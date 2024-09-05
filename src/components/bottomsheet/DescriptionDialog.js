import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';

const DescriptionDialog = () => {
  const {t} = useTranslation();
  const [desc, setDesc] = useState('');
  const isDiable = !desc;
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <Ionicons name={Assets.icon.close} size={24} color="black" />
        </View>
        <View style={bottomSheetStyle.bodyContainer}>
          <Text style={bottomSheetStyle.titleDialog}>
            {t('descDialog.title')}
          </Text>
          <Text style={bottomSheetStyle.desc}>{t('descDialog.desc')}</Text>
          <TextInput
            style={[bottomSheetStyle.input, bottomSheetStyle.descInput]}
            placeholder={t('descDialog.placeholder')}
            placeholderTextColor={Colors.secondary}
            value={desc}
            onChangeText={text => setDesc(text)}
            multiline={true}
          />

          <TouchableOpacity
            disabled={isDiable}
            style={[bottomSheetStyle.btnContainer, isDiable && {opacity: 0.5}]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('descDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DescriptionDialog;

const styles = StyleSheet.create({});

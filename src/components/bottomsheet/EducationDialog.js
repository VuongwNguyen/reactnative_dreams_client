import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';

const EducationDialog = () => {
  const {t} = useTranslation();
  const [school, setSchool] = useState('');
  const [value, setValue] = useState(null);
  const isDisable = !value;
  const data = [
    {label: t('educationDialog.level1'), value: 'Basic'},
    {label: t('educationDialog.level2'), value: 'Undergraduate'},
    {label: t('educationDialog.level3'), value: 'Postgraduate'},
  ];
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <Image source={Assets.icons.close} style={{height: 20, width: 20}} />
        </View>
        <View style={bottomSheetStyle.bodyContainer}>
          <Text style={bottomSheetStyle.titleDialog}>
            {t('educationDialog.title')}
          </Text>
          <Text style={bottomSheetStyle.desc}>{t('educationDialog.desc')}</Text>
          <Dropdown
            placeholder={t('educationDialog.placeholder')}
            placeholderStyle={bottomSheetStyle.selectPlaceholder}
            selectedTextStyle={bottomSheetStyle.selectText}
            data={data}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            style={bottomSheetStyle.educationLevel}
          />
          <TextInput
            style={bottomSheetStyle.input}
            placeholder={t('educationDialog.school')}
            placeholderTextColor={Colors.secondary}
            value={school}
            onChangeText={text => setSchool(text)}
          />

          <TouchableOpacity
            disabled={isDisable}
            style={[
              bottomSheetStyle.btnContainer,
              isDisable && {opacity: 0.5},
            ]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('educationDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EducationDialog;

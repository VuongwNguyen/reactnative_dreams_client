import {Text, View, TouchableOpacity, Image, } from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
const NationalityDialog = () => {
  const {t} = useTranslation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [icon, setIcon] = useState(Assets.image.nationality);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[bottomSheetStyle.label, isFocus && {color: Colors.primary}]}>
          Nationality
        </Text>
      );
    }
    return null;
  };

  const handleDropdownChange = item => {
    setValue(item.value);
    setIcon(item.icon);
    setIsFocus(false);
  };
  const isDisable = !value;
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <Image source={Assets.icons.close} style={{height: 20, width: 20}} />
        </View>
        <View style={bottomSheetStyle.bodyContainer}>
          <Text style={bottomSheetStyle.titleDialog}>
            {t('nationalityDialog.title')}
          </Text>
          <Text style={bottomSheetStyle.desc}>
            {t('nationalityDialog.desc')}
          </Text>
          <View style={bottomSheetStyle.dropdownContainer}>
            {renderLabel()}
            <Dropdown
              style={[
                bottomSheetStyle.dropdown,
                isFocus && {borderColor: Colors.primary},
              ]}
              placeholderStyle={bottomSheetStyle.selectPlaceholder}
              selectedTextStyle={bottomSheetStyle.selectText}
              inputSearchStyle={bottomSheetStyle.selectText}
              iconStyle={bottomSheetStyle.iconDrop}
              data={data}
              search
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder={
                !isFocus ? t('nationalityDialog.placeholder') : '...'
              }
              searchPlaceholder={t('nationalityDialog.search')}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleDropdownChange}
              renderLeftIcon={() => (
                <Image source={icon} style={bottomSheetStyle.iconFlag} />
              )}
            />
          </View>
          <TouchableOpacity
            disabled={isDisable}
            style={[
              bottomSheetStyle.btnContainer,
              isDisable && {opacity: 0.5},
            ]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('nationalityDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NationalityDialog;

const data = [
  {label: 'Việt Nam', value: 'VietNam', icon: Assets.image.vietnam},
  {label: 'Malaysia', value: 'Malaysia', icon: Assets.image.malaysia},
  {label: 'ThaiLand', value: 'ThaiLand', icon: Assets.image.thailand},
  {label: 'Laos', value: 'Laos', icon: Assets.image.laos},
  {label: 'Korea', value: 'Korea', icon: Assets.image.korea},
  {label: 'Japan', value: 'Japan', icon: Assets.image.japan},
  {label: 'The US', value: 'The US', icon: Assets.image.us},
  {label: 'The UK', value: 'The UK', icon: Assets.image.uk},
  {label: 'Cambodia', value: 'Cambodia', icon: Assets.image.cambodia},
  {label: 'France', value: 'France', icon: Assets.image.france},
];

import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {privacySettingItemStyle} from '../../styles/privacysetting/PrivacySettingItemStyle';
import {Dropdown} from 'react-native-element-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {Assets, Sizing} from '../../styles';
import {useTranslation} from 'react-i18next';
const PrivacySettingItem = props => {
  const {t} = useTranslation();
  const {title, content, status} = props;
  const [icStatus, setIcStatus] = useState(status);
  const data = [
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ];
  return (
    <View style={privacySettingItemStyle.container}>
      <View style={privacySettingItemStyle.infContainer}>
        <Feather name={Assets.icon.user} size={Sizing.lg} color="black" />
        <View style={privacySettingItemStyle.contentContainer}>
          <Text style={privacySettingItemStyle.title}>{title}</Text>
          <Text style={privacySettingItemStyle.content}>{content}</Text>
        </View>
      </View>
      <View style={privacySettingItemStyle.dropdownContainer}>
        <Dropdown
          placeholderStyle={privacySettingItemStyle.dropdownText}
          selectedTextStyle={privacySettingItemStyle.dropdownText}
          data={data}
          labelField="label"
          valueField="value"
          value={status}
          onChange={item => {
            setValue(item.value);
            setIcStatus(item.value);
          }}
          renderLeftIcon={() => (
            <Feather
              color={'black'}
              name={
                icStatus == 'public' ? Assets.icon.public : Assets.icon.privacy
              }
              size={20}
              style={privacySettingItemStyle.icon}
            />
          )}
          style={privacySettingItemStyle.dropdown}
        />
      </View>
    </View>
  );
};

export default PrivacySettingItem;

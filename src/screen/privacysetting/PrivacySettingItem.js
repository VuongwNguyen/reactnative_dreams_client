import {Image, Text, View} from 'react-native';
import React, {useState} from 'react';
import {privacySettingItemStyle} from '../../styles/privacysetting/PrivacySettingItemStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {Assets, Sizing} from '../../styles';
const PrivacySettingItem = props => {
  const {title, content, status} = props;
  const [icStatus, setIcStatus] = useState(status);
  const [value, setValue] = useState(status);

  const data = [
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ];
  return (
    <View style={privacySettingItemStyle.container}>
      <View style={privacySettingItemStyle.infContainer}>
        <Image source={Assets.icons.user} style={{height: 20, width: 20}} />
        <View style={privacySettingItemStyle.contentContainer}>
          <Text style={privacySettingItemStyle.title}>{title}</Text>
          <Text style={privacySettingItemStyle.content}>{content}</Text>
        </View>
      </View>
      <Dropdown
        placeholderStyle={privacySettingItemStyle.dropdownText}
        selectedTextStyle={privacySettingItemStyle.dropdownText}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={item => {
          setValue(item.value);
          setIcStatus(item.value);
        }}
        renderLeftIcon={() => (
          <Image
            source={
              icStatus == 'public' ? Assets.icons.earth : Assets.icons.privacy
            }
            style={{height: 20, width: 20, marginRight: 5}}
          />
        )}
        style={privacySettingItemStyle.dropdown}
      />
    </View>
  );
};

export default PrivacySettingItem;

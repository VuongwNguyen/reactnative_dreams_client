import {Image, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {privacySettingItemStyle} from '../../styles/privacysetting/PrivacySettingItemStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch} from 'react-redux';
import {Assets, } from '../../styles';
import {APIUpdateInf} from '../../store/api/InfAPI';

const PrivacySettingItem = props => {
  const {icon, title, status, infKey} = props;
  const [icStatus, setIcStatus] = useState(status);
  const [value, setValue] = useState(status);
  const dispatch = useDispatch();
  const data = [
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ];
  return (
    <View style={privacySettingItemStyle.container}>
      <View style={privacySettingItemStyle.infContainer}>
        <Image source={icon} style={{height: 24, width: 24}} />
        <Text style={privacySettingItemStyle.title}>{title}</Text>
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
          dispatch(APIUpdateInf({key: infKey, privacy_status: item.value}))
            .unwrap()
            .then(() =>
              ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT),
            )
            .catch(err => {
              ToastAndroid.show(err.message, ToastAndroid.SHORT);
            });
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

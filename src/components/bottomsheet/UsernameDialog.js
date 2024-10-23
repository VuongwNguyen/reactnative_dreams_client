import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
const UsernameDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));
  const {t} = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const isDisabled = !firstName || !lastName;
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <View style={bottomSheetStyle.modalBackground}>
        <View style={bottomSheetStyle.container}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Image
              source={Assets.icons.close}
              style={{height: 24, width: 24}}
            />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('usernameDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('usernameDialog.desc')}
            </Text>
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
              style={[
                bottomSheetStyle.btnContainer,
                isDisabled && {opacity: 0.5},
              ]}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('usernameDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default UsernameDialog;

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { bottomSheetStyle } from '../../styles/bottomsheet/BottomSheetStyle';
import { Assets, Colors } from '../../styles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { APIUpdateInf } from '../../store/api/InfAPI';
import { APIGetUserBasicInf } from '../../store/api/AccountAPI';

const UsernameDialog = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(props.firstName || '');
  const [lastName, setLastName] = useState(props.lastName || '');
  const isDisabled = !firstName || !lastName;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props?.firstName || props?.lastName) {
      setFirstName(props.firstName || '');
      setLastName(props.lastName || '');
    }
  }, [props?.firstName, props?.lastName]);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const handleSubmit = () => {
    const fullName = `${firstName} ${lastName}`;
    const body = { key: 'fullname', value: fullName };
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        dispatch(APIGetUserBasicInf());
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(fullName);
  };
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
              style={{ height: 24, width: 24 }}
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
                style={[bottomSheetStyle.input, { width: '50%' }]}
                placeholder={t('usernameDialog.firstname')}
                placeholderTextColor={Colors.secondary}
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />
              <TextInput
                style={[bottomSheetStyle.input, { width: '50%' }]}
                placeholder={t('usernameDialog.lastname')}
                placeholderTextColor={Colors.secondary}
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={isDisabled}
              style={[
                bottomSheetStyle.btnContainer,
                isDisabled && { opacity: 0.5 },
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

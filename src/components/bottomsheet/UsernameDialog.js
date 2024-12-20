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
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {APIUpdateAvtUsername, APIUpdateInf} from '../../store/api/InfAPI';
import {APIGetUserBasicInf} from '../../store/api/AccountAPI';
import AppButton from '../Button';

const UsernameDialog = forwardRef((props, ref) => {
  const {t} = useTranslation();
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
    const fullname = `${firstName} ${lastName}`;
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);

    dispatch(APIUpdateAvtUsername(formData))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
        dispatch(APIGetUserBasicInf());
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(fullname);
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
            <View style={bottomSheetStyle.btnContainer}>
              <AppButton
                title={t('usernameDialog.confirm')}
                isDisable={isDisabled}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default UsernameDialog;

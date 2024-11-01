import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState,useEffect, forwardRef, useImperativeHandle} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {APIUpdateInf} from '../../store/api/InfAPI';
const NicknameDialog = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState(props?.data);
  const isDisabled = !nickName;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props?.data) {
      setNickName(props.data);
    }
  }, [props?.data]);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const handleSubmit = () => {
    const body = {key: 'nick', value: nickName};
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(nickName);
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
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('nicknameDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('nicknameDialog.desc')}
            </Text>
            <TextInput
              style={bottomSheetStyle.input}
              placeholder={t('nicknameDialog.nickname')}
              placeholderTextColor={Colors.secondary}
              value={nickName}
              onChangeText={text => setNickName(text)}
            />

            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={isDisabled}
              style={[
                bottomSheetStyle.btnContainer,
                isDisabled && {opacity: 0.5},
              ]}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('nicknameDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default NicknameDialog;

import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import { useDispatch } from 'react-redux';
import { APIUpdateInf } from '../../store/api/InfAPI';

const HometownDialog = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const dispatch = useDispatch()
  const [hometown, setHometown] = useState(props?.data);
  const isDisabled = !hometown;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props?.data) {
      setHometown(props.data);
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
    const body = {key: 'htown', value: hometown};
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(hometown);
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
              {t('hometownDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('hometownDialog.desc')}
            </Text>
            <TextInput
              style={bottomSheetStyle.input}
              placeholder={t('hometownDialog.placeholder')}
              placeholderTextColor={Colors.secondary}
              value={hometown}
              onChangeText={text => setHometown(text)}
            />

            <TouchableOpacity
            onPress={()=>handleSubmit()}
              disabled={isDisabled}
              style={[
                bottomSheetStyle.btnContainer,
                isDisabled && {opacity: 0.5},
              ]}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('hometownDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default HometownDialog;

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import { APIUpdateInf } from '../../store/api/InfAPI';

const DescriptionDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState('');
  const isDiable = !desc;

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const handleSubmit = () => {
    const body = {key: 'nick', value: desc};

    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(desc);
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
            <Image source={Assets.icons.close} />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('descDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>{t('descDialog.desc')}</Text>
            <TextInput
              style={[bottomSheetStyle.input, bottomSheetStyle.descInput]}
              placeholder={t('descDialog.placeholder')}
              placeholderTextColor={Colors.secondary}
              value={desc}
              onChangeText={text => setDesc(text)}
              multiline={true}
            />

            <TouchableOpacity
              disabled={isDiable}
              style={[
                bottomSheetStyle.btnContainer,
                isDiable && {opacity: 0.5},
              ]}
              onPress={() => handleSubmit()}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('descDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default DescriptionDialog;

const styles = StyleSheet.create({});

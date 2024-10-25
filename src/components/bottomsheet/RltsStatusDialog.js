import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { bottomSheetStyle } from '../../styles/bottomsheet/BottomSheetStyle';
import { Assets } from '../../styles';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { APIUpdateInf } from '../../store/api/InfAPI';

const RlstStatusDialog = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(props?.data);
  const isDisable = !value;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props?.data) {
      setValue(props.data);
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

  const data = [
    { label: t('rlstStatusDialog.single'), value: 'Single' },
    { label: t('rlstStatusDialog.dating'), value: 'Dating' },
    { label: t('rlstStatusDialog.married'), value: 'Married' },
  ];

  const handleSubmit = () => {
    const body = { key: 'rlst', value: value };
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(value);
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
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('rlstStatusDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('rlstStatusDialog.desc')}
            </Text>
            <Dropdown
              placeholder={t('rlstStatusDialog.placeholder')}
              placeholderStyle={bottomSheetStyle.selectPlaceholder}
              selectedTextStyle={bottomSheetStyle.selectText}
              data={data}
              labelField="label"
              valueField="value"
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              style={bottomSheetStyle.educationLevel}
            />
            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={isDisable}
              style={[
                bottomSheetStyle.btnContainer,
                isDisable && { opacity: 0.5 },
              ]}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('educationDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default RlstStatusDialog;

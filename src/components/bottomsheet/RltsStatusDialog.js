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
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';

const RlstStatusDialog = forwardRef((props, ref) => {
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
  const [value, setValue] = useState(null);
  const isDisable = !value;
  const data = [
    {label: t('rlstStatusDialog.single'), value: 'Single'},
    {label: t('rlstStatusDialog.dating'), value: 'Dating'},
    {label: t('rlstStatusDialog.married'), value: 'Married'},
  ];
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
              disabled={isDisable}
              style={[
                bottomSheetStyle.btnContainer,
                isDisable && {opacity: 0.5},
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

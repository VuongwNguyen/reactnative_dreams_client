import {
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
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {APIUpdateInf} from '../../store/api/InfAPI';

const EducationDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [school, setSchool] = useState('');
  const [value, setValue] = useState(null);
  const isDisable = !value;
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const data = [
    {label: t('educationDialog.level1'), value: 'Basic'},
    {label: t('educationDialog.level2'), value: 'Undergraduate'},
    {label: t('educationDialog.level3'), value: 'Postgraduate'},
  ];

  const handleSubmit = () => {
    const body = {key: 'edu', value: value};
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
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('educationDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('educationDialog.desc')}
            </Text>
            <Dropdown
              placeholder={t('educationDialog.placeholder')}
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
            <TextInput
              style={bottomSheetStyle.input}
              placeholder={t('educationDialog.school')}
              placeholderTextColor={Colors.secondary}
              value={school}
              onChangeText={text => setSchool(text)}
            />

            <TouchableOpacity
              disabled={isDisable}
              style={[
                bottomSheetStyle.btnContainer,
                isDisable && {opacity: 0.5},
              ]}
              onPress={() => handleSubmit()}>
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

export default EducationDialog;

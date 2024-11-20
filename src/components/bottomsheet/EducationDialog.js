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
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {APIUpdateInf} from '../../store/api/InfAPI';
import AppButton from '../Button';

const EducationDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [school, setSchool] = useState('');
  const [value, setValue] = useState(null);
  const isDisable = !value;

  useEffect(() => {
    if (props?.level || props?.school) {
      setValue(props.level || '');
      setSchool(props.school || '');
    }
  }, [props?.level, props?.school]);

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
    const eduString = `${value} at ${school}`;

    const body = {key: 'edu', value: eduString};
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(eduString);
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
            <View style={{marginTop: 30}}>
              <AppButton
                title={t('educationDialog.confirm')}
                isDisable={isDisable}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default EducationDialog;

import {
  Text,
  View,
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
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {APIUpdateInf} from '../../store/api/InfAPI';
import AppButton from '../Button';
import { styles } from '@stream-io/video-react-native-sdk';

const GenderDialog = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState(props?.data);
  const isDisabled = !selectedGender;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props?.data) {
      setSelectedGender(props.data);
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

  const handleSelectGender = gender => {
    setSelectedGender(gender);
  };

  const handleSubmit = () => {
    const body = {key: 'gender', value: selectedGender};
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(selectedGender);
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
              {t('genderDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>{t('genderDialog.desc')}</Text>
            <View style={bottomSheetStyle.genderContainer}>
              <View style={bottomSheetStyle.genderItem}>
                <TouchableOpacity
                  style={[
                    bottomSheetStyle.genderBtn,
                    {
                      backgroundColor:
                        selectedGender === 'male' ? '#bdeffd' : '#f2f2f2',
                    },
                    selectedGender === 'male' && {
                      borderWidth: 1,
                      borderColor: Colors.primary,
                    },
                  ]}
                  onPress={() => handleSelectGender('male')}>
                  <Image
                    source={Assets.icons.male}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    bottomSheetStyle.genderLabel,
                    {
                      color: selectedGender === 'male' ? '#000' : '#6C757D',
                    },
                  ]}>
                  {t('genderDialog.male')}
                </Text>
              </View>
              <View style={bottomSheetStyle.genderItem}>
                <TouchableOpacity
                  style={[
                    bottomSheetStyle.genderBtn,
                    {
                      backgroundColor:
                        selectedGender === 'female' ? '#ffd6e4' : '#f2f2f2',
                    },
                    selectedGender === 'female' && {
                      borderWidth: 1,
                      borderColor: '#ff4181',
                    },
                  ]}
                  onPress={() => handleSelectGender('female')}>
                  <Image
                    source={Assets.icons.female}
                    style={{height: 60, width: 60}}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    bottomSheetStyle.genderLabel,
                    {
                      color: selectedGender === 'female' ? '#000' : '#6C757D',
                    },
                  ]}>
                  {t('genderDialog.female')}
                </Text>
              </View>
            </View>
            <View style={bottomSheetStyle.btnContainer}>
              <AppButton
                title={t('genderDialog.confirm')}
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

export default GenderDialog;

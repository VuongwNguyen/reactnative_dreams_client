import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets} from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {
  APIGetInf,
  APIPersonalDetailInf,
  APIUpdateInf,
} from '../../store/api/InfAPI';
import AppButton from '../Button';

const DateOfBirthDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setIsSelected(true);
  };

  const calculateAge = () => {
    const yearDiff = new Date().getFullYear() - date.getFullYear();
    const monthDiff = new Date().getMonth() - date.getMonth();
    const age =
      monthDiff < 0 ||
      (monthDiff === 0 && new Date().getDate() < date.getDate())
        ? yearDiff - 1
        : yearDiff;
    return age;
  };

  const age = calculateAge();

  const getZodiacSign = birthdate => {
    const day = birthdate.getDate();
    const month = birthdate.getMonth() + 1;

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return t('dateOfBirthDialog.aquarius');
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return t('dateOfBirthDialog.pisces');
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return t('dateOfBirthDialog.aries');
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return t('dateOfBirthDialog.taurus');
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return t('dateOfBirthDialog.gemini');
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return t('dateOfBirthDialog.cancer');
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
      return t('dateOfBirthDialog.leo');
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return t('dateOfBirthDialog.virgo');
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return t('dateOfBirthDialog.libra');
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return t('dateOfBirthDialog.scorpio');
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return t('dateOfBirthDialog.sagittarius');
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return t('dateOfBirthDialog.capricorn');
    return '';
  };

  const zodiacSign = age > 0 ? getZodiacSign(date) : 'Undefined';

  const handleSubmit = () => {
    const dateString = `${date.getDate()} - ${
      date.getMonth() + 1
    } - ${date.getFullYear()}`;
    const bodyDob = {key: 'dob', value: dateString};
    const bodyZodiac = {key: 'zodiac', value: zodiacSign};

    dispatch(APIUpdateInf(bodyDob))
      .unwrap()
      .then(() => {
        dispatch(APIUpdateInf(bodyZodiac));
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(dateString, zodiacSign);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <View style={bottomSheetStyle.modalBackground}>
        <View style={bottomSheetStyle.container}>
          <TouchableOpacity
            style={bottomSheetStyle.closeBtn}
            onPress={() => setVisible(false)}>
            <Image
              source={Assets.icons.close}
              style={bottomSheetStyle.closeIcon}
            />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('dateOfBirthDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('dateOfBirthDialog.desc')}
            </Text>
            <View style={bottomSheetStyle.derivedFieldContainer}>
              <Text style={bottomSheetStyle.derivedField}>
                {t('dateOfBirthDialog.age')}:{' '}
                <Text style={bottomSheetStyle.normalText}>{age}</Text>
              </Text>
              <Text style={bottomSheetStyle.derivedField}>
                {t('dateOfBirthDialog.zodiac')}:{' '}
                <Text style={bottomSheetStyle.normalText}>{zodiacSign}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={showDatepicker}
              style={bottomSheetStyle.datePickerButton}>
              {!isSelected ? (
                <View style={bottomSheetStyle.datePickerBtnContent}>
                  <Text style={bottomSheetStyle.selectPlaceholder}>
                    {t('dateOfBirthDialog.placeholder')}
                  </Text>
                  <Image
                    source={Assets.icons.calendar}
                    style={{width: 20, height: 20}}
                  />
                </View>
              ) : (
                <Text style={bottomSheetStyle.selectText}>
                  {date.getDate()} - {date.getMonth() + 1} -{' '}
                  {date.getFullYear()}
                </Text>
              )}
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={onChange}
              />
            )}
            <View style={{marginTop: 30}}>
              <AppButton
                title={t('dateOfBirthDialog.confirm')}
                isDisable={age <= 0}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default DateOfBirthDialog;

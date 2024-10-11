import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';

const DateOfBirthDialog = () => {
  const {t} = useTranslation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showDatepicker = () => {
    setShow(true);
    setIsSelected(true);
  };

  const age = new Date().getFullYear() - date.getFullYear();
  const monthDiff = new Date().getMonth() - date.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && new Date().getDate() < date.getDate())
  ) {
    age--;
  }

  const getZodiacSign = birthdate => {
    const date = new Date(birthdate);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return t('dateOfBirthDialog.aquarius');
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return t('dateOfBirthDialog.pisces');
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return t('dateOfBirthDialog.aries');
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return t('dateOfBirthDialog.taurus');
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return t('dateOfBirthDialog.gemini');
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return t('dateOfBirthDialog.cancer');
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return t('dateOfBirthDialog.leo');
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return t('dateOfBirthDialog.virgo');
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return t('dateOfBirthDialog.libra');
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return t('dateOfBirthDialog.scorpio');
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return t('dateOfBirthDialog.sagittarius');
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return t('dateOfBirthDialog.capricorn');
    }

    return '';
  };

  const zodiacSign = getZodiacSign(date);
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <TouchableOpacity style={bottomSheetStyle.closeBtn}>
            <Image
              source={Assets.icons.close}
              style={bottomSheetStyle.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={bottomSheetStyle.bodyContainer}>
          <Text style={bottomSheetStyle.titleDialog}>
            {t('dateOfBirthDialog.title')}
          </Text>
          <Text style={bottomSheetStyle.desc}>
            {t('dateOfBirthDialog.desc')}
          </Text>
          <View style={bottomSheetStyle.derivedFieldContainer}>
            <Text style={bottomSheetStyle.derivedField}>
              {t('dateOfBirthDialog.age')}: {age}
            </Text>
            <Text style={bottomSheetStyle.derivedField}>
              {t('dateOfBirthDialog.zodiac')}: {zodiacSign}
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
                {date.getDate()} - {date.getMonth() + 1} - {date.getFullYear()}
              </Text>
            )}
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}

          <TouchableOpacity
            disabled={age <= 0 ? true : false}
            style={[bottomSheetStyle.btnContainer, age <= 0 && {opacity: 0.5}]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('dateOfBirthDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DateOfBirthDialog;

import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';

const GenderDialog = () => {
  const {t} = useTranslation();
  const [selectedGender, setSelectedGender] = useState(null);

  const handleSelectGender = gender => {
    setSelectedGender(gender);
  };
  const isDisabled = !selectedGender;
  return (
    <View>
      <View style={bottomSheetStyle.container}>
        <View>
          <Ionicons name={Assets.icon.close} size={24} color="black" />
        </View>
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
                <Ionicons
                  name={Assets.icon.male}
                  size={60}
                  color={Colors.primary}
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
                <Ionicons
                  name={Assets.icon.female}
                  size={60}
                  color={'#ff4181'}
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
          <TouchableOpacity
            disabled={isDisabled}
            style={[
              bottomSheetStyle.btnContainer,
              isDisabled && {opacity: 0.5},
            ]}>
            <Text style={bottomSheetStyle.btnLabel}>
              {t('genderDialog.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GenderDialog;

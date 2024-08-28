import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../styles';
import Header from '../../components/Header';
import CheckBoxLanguage from '../../components/CheckBoxLanguage';
import { LanguageSettingStyle } from '../../styles/languagesettingstyle/LanguageSettingStyle';

const langObject = {
  eng:'English',
  vi:'Vietnamese'
}
const LanguageSettingScreen = () => {
  const [curLang, setCurLang] = useState(langObject.eng);
  return (
    <View style={LanguageSettingStyle.container}>
      <Header title={'Language Settings'} />
      <View style={LanguageSettingStyle.content}>
        {Object.keys(langObject).map((item, index) => (
          <TouchableOpacity key={index} style={LanguageSettingStyle.row} onPress={() => setCurLang(langObject[item])}>
            <Text style={LanguageSettingStyle.title}>{langObject[item]}</Text>
            <CheckBoxLanguage
              isCheck={curLang === langObject[item]}
              onPress={() => setCurLang(langObject[item])}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LanguageSettingScreen;

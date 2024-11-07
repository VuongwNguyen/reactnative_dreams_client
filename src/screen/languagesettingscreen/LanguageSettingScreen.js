import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import Header from '../../components/Header';
import CheckBoxLanguage from '../../components/CheckBoxLanguage';
import { LanguageSettingStyle } from '../../styles/languagesettingstyle/LanguageSettingStyle';
import { lng } from '../../lang';

const langObject = {
  en: 'English',
  vi: 'Vietnamese',
};

const LanguageSettingScreen = () => {
  const { i18n } = useTranslation();
  const [curLang, setCurLang] = useState(lng); // Khởi tạo ngôn ngữ mặc định

  // Cập nhật ngôn ngữ khi component mount
  useEffect(() => {
    setCurLang(i18n.language); // Đặt ngôn ngữ hiện tại từ i18n
  }, []);

  const handleLanguageChange = (lng) => {
    setCurLang(lng); // Cập nhật ngôn ngữ hiện tại
    ToastAndroid.show(`Change language to ${langObject[lng]}`, ToastAndroid.SHORT); // Hiển thị thông báo
    i18n.changeLanguage(lng); // Thay đổi ngôn ngữ của i18next
  };

  return (
    <View style={LanguageSettingStyle.container}>
      <Header title={'Language Settings'} />
      <View style={LanguageSettingStyle.content}>
        {Object.keys(langObject).map((item) => (
          <TouchableOpacity
            key={item}
            style={LanguageSettingStyle.row}
            onPress={() => handleLanguageChange(item)} // Gọi hàm thay đổi ngôn ngữ
          >
            <Text style={LanguageSettingStyle.title}>{langObject[item]}</Text>
            <CheckBoxLanguage
              isCheck={curLang === item} // Kiểm tra xem ngôn ngữ hiện tại có khớp không
              onPress={() => handleLanguageChange(item)} // Gọi hàm thay đổi ngôn ngữ
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LanguageSettingScreen;
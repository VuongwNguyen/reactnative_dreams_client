import {FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import DropDownText from '../../components/DropDownText';
import PolicyPrivacyStyle from '../../styles/policyprivacystyle/PolicyPrivacyStyle';
import AxiosInstance from '../../configs/axiosInstance';
import { useTranslation } from 'react-i18next';
const PolicyPrivacyScreen = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
    AxiosInstance()
      .get('/policy/policy')
      .then(res => {
        setData(res.data);
      });
  }, []);

  return (
    <View style={PolicyPrivacyStyle.container}>
      <Header title={t('policyScreen.title')} />
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <DropDownText title={item.title} contents={item.children} />
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default PolicyPrivacyScreen;

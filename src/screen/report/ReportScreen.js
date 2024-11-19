import {Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {reportStyle} from '../../styles/report/ReportStyle';
import AppHeader from '../../components/Header';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../styles';
import AppButton from '../../components/Button';
import {APISendReport} from '../../store/api/ReportAPI';
import {stackName} from '../../navigations/screens';

const ReportScreen = props => {
  const {navigation, route} = props;
  const type = route?.params?.type;
  var id;
  if (type === 'post') {
    id = route?.params.post_id;
  } else {
    id = route?.params.user_id;
  }
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [selectedItem, setSelectedItem] = useState('');
  const [indexReason, setIndexReason] = useState('');
  const [desc, setDesc] = useState('');
  const reasonPostArr = [
    t('reportScreen.post.r1'),
    t('reportScreen.post.r2'),
    t('reportScreen.post.r3'),
    t('reportScreen.post.r4'),
    t('reportScreen.post.r5'),
    t('reportScreen.post.r6'),
  ];
  const reasonUserArr = [
    t('reportScreen.user.r1'),
    t('reportScreen.user.r2'),
    t('reportScreen.user.r3'),
    t('reportScreen.user.r4'),
    t('reportScreen.user.r5'),
  ];
  const onSubmit = () => {
    const tString =
      type === 'post'
        ? `reportScreen.post.r${indexReason}`
        : `reportScreen.user.r${indexReason}`;
    const tEnglish = i18n.getFixedT('en');
    const body = {
      reported_content_id: id,
      report_type: type,
      reason: tEnglish(tString),
      description: desc,
    };

    dispatch(APISendReport(body))
      .unwrap()
      .then(res => {
        ToastAndroid.show('Gửi báo cáo thành công', ToastAndroid.SHORT),
          navigation.navigate(stackName.bottomTab.name);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };
  const renderItemReasonPost = () => {
    return (
      <View style={reportStyle.reasonGroup}>
        {reasonPostArr.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(item);
                setIndexReason(index + 1);
              }}
              style={[
                reportStyle.itemContainer,
                item === selectedItem
                  ? reportStyle.itemSelected
                  : reportStyle.itemUnselected,
              ]}
              key={index}>
              <Text
                style={
                  item === selectedItem
                    ? reportStyle.itemTextSelected
                    : reportStyle.itemText
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const renderItemReasonUser = () => {
    return (
      <View style={reportStyle.reasonGroup}>
        {reasonUserArr.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(item);
                setIndexReason(index + 1);
              }}
              style={[
                reportStyle.itemContainer,
                item === selectedItem
                  ? reportStyle.itemSelected
                  : reportStyle.itemUnselected,
              ]}
              key={index}>
              <Text
                style={
                  item === selectedItem
                    ? reportStyle.itemTextSelected
                    : reportStyle.itemText
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={reportStyle.container}>
      <AppHeader title={'Report'} />
      <View style={reportStyle.bodyContainer}>
        <View style={reportStyle.reasonContainer}>
          <Text style={reportStyle.titleText}>
            {t('reportScreen.reasonTitle')}
          </Text>
          {type === 'post' ? renderItemReasonPost() : renderItemReasonUser()}
        </View>
        <View style={reportStyle.descContainer}>
          <Text style={reportStyle.titleText}>
            {' '}
            {t('reportScreen.descTitle')}
          </Text>
          <TextInput
            value={desc}
            onChangeText={text => setDesc(text)}
            style={reportStyle.input}
            placeholder={t('reportScreen.placeholder')}
            placeholderTextColor={Colors.secondary}
            multiline={true}
          />
        </View>
        <View style={reportStyle.buttonContainer}>
          <AppButton
            title={t('reportScreen.submit')}
            onPress={onSubmit}
            isDisable={!selectedItem}
          />
        </View>
      </View>
    </View>
  );
};

export default ReportScreen;

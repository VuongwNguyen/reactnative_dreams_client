import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {reportStyle} from '../../styles/report/ReportStyle';
import AppHeader from '../../components/Header';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../styles';
import AppButton from '../../components/Button';

const ReportScreen = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [desc, setDesc] = useState('');
  const reasonArr = [
    'Nội dung người lớn',
    'Gian lận, lừa đảo ',
    'Tôi không muốn xem nội dung này',
    'Nội dung tiêu cực',
    'Quảng cáo sai sự thật',
    'Vấn đề bản quyền',
  ];
  const renderItemReason = () => {
    return (
      <View style={reportStyle.reasonGroup}>
        {reasonArr.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedItem(item)}
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
            Hãy cho biết lí do bạn thực hiện báo cáo này !
          </Text>
          {renderItemReason()}
        </View>
        <View style={reportStyle.descContainer}>
          <Text style={reportStyle.titleText}>Hãy mô tả thêm về báo cáo </Text>
          <TextInput
            value={desc}
            onChangeText={(text)=> setDesc(text)}
            style={reportStyle.input}
            placeholder="Description"
            placeholderTextColor={Colors.secondary}
            multiline={true}
          />
        </View>
        <View style={reportStyle.buttonContainer}>
          <AppButton title={'Submit'} />
        </View>
      </View>
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({});

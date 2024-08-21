import { View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import DropDownText from '../../components/DropDownText';
import PolicyPrivacyStyle from '../../styles/policyprivacystyle/PolicyPrivacyStyle';

const data = [
  {
    title: '5 điều Bác Hồ dạy',
    contents:[
      '1.Yêu tổ quốc yêu đồng bào',
      '2.Học tập tốt lao động tốt',
      '3.Đoàn kết tốt kỷ luật tốt',
      '4.Giữ gìn vệ sinh thật tốt',
      '5.Khiêm tốn thật thà dũng cảm',
    ]
  },
  {
    title: '5 điều Bác Hồ dạy',
    contents:[
      '1.Yêu tổ quốc yêu đồng bào',
      '2.Học tập tốt lao động tốt',
      '3.Đoàn kết tốt kỷ luật tốt',
      '4.Giữ gìn vệ sinh thật tốt',
      '5.Khiêm tốn thật thà dũng cảm',
    ]
  },
  {
    title: '5 điều Bác Hồ dạy',
    contents:[
      '1.Yêu tổ quốc yêu đồng bào',
      '2.Học tập tốt lao động tốt',
      '3.Đoàn kết tốt kỷ luật tốt',
      '4.Giữ gìn vệ sinh thật tốt',
      '5.Khiêm tốn thật thà dũng cảm',
    ]
  },
  {
    title: '5 điều Bác Hồ dạy',
    contents:[
      '1.Yêu tổ quốc yêu đồng bào',
      '2.Học tập tốt lao động tốt',
      '3.Đoàn kết tốt kỷ luật tốt',
      '4.Giữ gìn vệ sinh thật tốt',
      '5.Khiêm tốn thật thà dũng cảm',
    ]
  },
]

const PolicyPrivacyScreen = () => {
  return (
    <View style={PolicyPrivacyStyle.container}>
       <Header title={'Policy Privacy'}/>
      {
        data.map((item,index) => <DropDownText key={index} title={item.title} contents={item.contents}/>)
      }
    </View>
  );
};

export default PolicyPrivacyScreen;

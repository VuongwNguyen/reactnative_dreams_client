import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Assets} from '../styles';
import DropDownTextStyle from '../styles/components/dropdowntext/DropDownTextStyle';

const DropDownText = props => {
  const {title = '', contents = []} = props;
  const [expand, setExpand] = useState(false);
  return (
    <View style={DropDownTextStyle.container}>
      <TouchableOpacity
        onPress={() => setExpand(!expand)}
        style={DropDownTextStyle.row}>
        <Text style={DropDownTextStyle.title}>{title}</Text>
        <Image
          source={expand ? Assets.image.arrow_up : Assets.image.arrow_down}
          style={DropDownTextStyle.iconDrop}
        />
      </TouchableOpacity>
      <View>
        {expand &&
          contents.map((content, index) => (
            <Text style={DropDownTextStyle.content} key={index}>
              {`${index + 1} - ` + content.title + 'ᡣ𐭩'}
            </Text>
          ))}
      </View>
    </View>
  );
};

export default DropDownText;

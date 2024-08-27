import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { Assets } from '../styles';
import DropDownTextStyle from '../styles/components/dropdowntext/DropDownTextStyle';

const DropDownText = (props) => {
  const {title = '', contents = []} = props;
  const [expand, setExpand] = useState(false);
  return (
    <View style={DropDownTextStyle.container}>
      <TouchableOpacity onPress={() => setExpand(!expand)} style={DropDownTextStyle.row}>
        <Text style={DropDownTextStyle.title}>{title}</Text>
        <Image source={expand ? Assets.image.arrow_up : Assets.image.arrow_down} style={DropDownTextStyle.iconDrop}/>
      </TouchableOpacity>
      <View>
      {expand && contents.map(content => (
        <Text style={DropDownTextStyle.content}>
          {'\t' + content}
        </Text>
      ))}
      </View>
    </View>
  );
};

export default DropDownText;
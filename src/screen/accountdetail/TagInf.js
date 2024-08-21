import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {tagInfStyle} from '../../styles/accountdetail/TagInfStyle';
import Feather from 'react-native-vector-icons/Feather';
import {Assets, Sizing} from '../../styles';
const TagInf = props => {
  const {tagTitle, content, icon, action = {}} = props;
  return (
    <View style={tagInfStyle.container}>
      <View style={tagInfStyle.infContainer}>
        <Feather name={icon} size={Sizing.lg} color="black" />
        <View style={tagInfStyle.textContainer}>
          <Text style={tagInfStyle.tagTitle}>{tagTitle}</Text>
          <Text style={tagInfStyle.content}>{content}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={action}>
        <Image
          source={Assets.image.right_arrow}
          size={Sizing.lg}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TagInf;

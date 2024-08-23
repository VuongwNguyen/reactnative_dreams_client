import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {tagInfStyle} from './../styles/accountdetail/TagInfStyle';
import {Assets, Sizing} from './../styles';
import {OptionIcon} from './../styles/app/OptionIcon';

const TagInf = props => {
  const {tagTitle, content, icon = {}, action = {}, func = () => {}} = props;
  return (
    <TouchableOpacity onPress={func} style={tagInfStyle.container}>
      <View style={tagInfStyle.infContainer}>
        <OptionIcon icon={icon} />
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
    </TouchableOpacity>
  );
};

export default TagInf;

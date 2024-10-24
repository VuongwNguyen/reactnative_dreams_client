import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {tagInfStyle} from './../styles/accountdetail/TagInfStyle';
import {Assets, Sizing} from './../styles';

const TagInf = props => {
  const {tagTitle, content, icon = {}, func = () => {}} = props;
  return (
    <TouchableOpacity onPress={func} style={tagInfStyle.container}>
      <View style={tagInfStyle.infContainer}>
        {!!icon && <Image source={icon} style={tagInfStyle.icon} />}
        <View style={tagInfStyle.textContainer}>
          <Text style={tagInfStyle.tagTitle}>{tagTitle}</Text>
          <Text style={tagInfStyle.content} numberOfLines={1}>
            {content}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
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

import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Assets, Colors, Typography} from './../styles';
import GridImage from './GirdImage';
import {itemPostStyle} from './../styles/components/itemPost/itemPostStyle';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default ItemPost = props => {
  const {item, isLike = true, handelItem} = props;
  const [like, setLike] = useState(isLike);
  return (
    <TouchableWithoutFeedback
      style={itemPostStyle.container}
      onPress={() => {}}>
      {/* header */}
      <View style={itemPostStyle.header}>
        {/* avatar */}
        <Image source={{uri: item.avatar}} style={itemPostStyle.avatar} />
        {/* name, hour */}
        <View>
          <Text style={Typography.postName}>{item.name}</Text>
          <Text style={itemPostStyle.headerLabel}>{item.hour}</Text>
        </View>
      </View>
      {/* content */}
      <View style={itemPostStyle.content}>
        {/* title */}
        <Text numberOfLines={2} style={Typography.postTitle}>
          {item.title}
        </Text>
        {/* content */}
        <TouchableOpacity onPress={() => {}}>
          <Text numberOfLines={3} style={Typography.postContent}>
            {'\t'}
            {item.content}
          </Text>
        </TouchableOpacity>
      </View>
      {/* image */}
      {item.image.length > 0 && <GridImage arrImages={item.image} />}
      {/* interact */}
      <View style={itemPostStyle.interactContainer}>
        {/* like */}
        <TouchableOpacity
          style={itemPostStyle.itemInteract}
          onPress={() => setLike(!like)}>
          <Image
            style={{height: 20, width: 20}}
            source={like ? Assets.icons.heartFill : Assets.icons.heart}
          />
          <Text style={itemPostStyle.interactLabel}>{item.like}</Text>
        </TouchableOpacity>
        {/* comment */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image
            source={Assets.icons.comment}
            style={itemPostStyle.image}></Image>
          <Text style={itemPostStyle.interactLabel}>{item.comment}</Text>
        </TouchableOpacity>
        {/* share */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image
            source={Assets.image.share}
            style={itemPostStyle.image}/>
          <Text style={itemPostStyle.interactLabel}>{item.share}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

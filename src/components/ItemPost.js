import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

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
      onPress={() => handelItem()}>
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
          {like ? (
            <Entypo
              name={Assets.icon.heartFill}
              size={24}
              color={Colors.error}
            />
          ) : (
            <Entypo name={Assets.icon.heart} size={24} color={Colors.black} />
          )}
          <Text style={itemPostStyle.interactLabel}>{item.like}</Text>
        </TouchableOpacity>
        {/* comment */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <EvilIcon name={Assets.icon.comment} size={24} color={Colors.black} />
          <Text style={itemPostStyle.interactLabel}>{item.comment}</Text>
        </TouchableOpacity>
        {/* share */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image
            source={Assets.image.share}
            style={itemPostStyle.image}></Image>
          <Text style={itemPostStyle.interactLabel}>{item.share}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

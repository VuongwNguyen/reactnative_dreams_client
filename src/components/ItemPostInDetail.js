import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Assets, Typography} from './../styles';
import {itemPostStyle} from '../styles/components/itemPost/itemPostStyle';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import GridImageDetail from './GirdImageDetail';

export default ItemPostInDetail = props => {
  const {item, isLike = true, handelItem = ''} = props;
  const [like, setLike] = useState(isLike);
  return (
    <TouchableWithoutFeedback
      style={itemPostStyle.container}
      onPress={handelItem}>
      {/* header */}
      <View style={itemPostStyle.header}>
        {/* avatar */}
        <Image
          source={{uri: item?.post?.author?.avatar?.url}}
          style={itemPostStyle.avatar}
        />
        {/* name, hour */}
        <View>
          <Text style={Typography.postName}>
            {item?.post?.author?.fullname}
          </Text>
          <Text style={itemPostStyle.headerLabel}>{item?.post?.createdAt}</Text>
        </View>
      </View>
      {/* content */}
      <View style={itemPostStyle.content}>
        {/* title */}
        <Text numberOfLines={2} style={Typography.postTitle}>
          {item?.post?.title}
        </Text>
        {/* content */}
        <TouchableOpacity onPress={() => {}}>
          <Text numberOfLines={3} style={Typography.postContent}>
            {'\t'}
            {item?.post?.content}
          </Text>
        </TouchableOpacity>
      </View>
      {/* image */}
      {item?.post?.images.length > 0 && (
        <GridImageDetail arrImages={item?.post?.images} />
      )}
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
          <Text style={itemPostStyle.interactLabel}>
            {item?.post?.likeCount}
          </Text>
        </TouchableOpacity>
        {/* comment */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image source={Assets.icons.comment} style={itemPostStyle.image} />
          <Text style={itemPostStyle.interactLabel}>
            {item?.post?.commentCount}
          </Text>
        </TouchableOpacity>
        {/* share */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image source={Assets.image.share} style={itemPostStyle.image} />
          <Text style={itemPostStyle.interactLabel}>0</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

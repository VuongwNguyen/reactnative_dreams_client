import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Assets, Colors, Typography} from './../styles';
import {useNavigation} from '@react-navigation/native';
import GridImage from './GirdImage';
import {itemPostStyle} from './../styles/components/itemPost/itemPostStyle';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {stackName} from '../navigations/screens';
import convertTimePost from '../utils/convertTimePost';

export default ItemPost = props => {
  const {item, isLike = true, handelItem} = props;
  const [like, setLike] = useState(isLike);
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      style={itemPostStyle.container}
      onPress={() => navigation.navigate(stackName.postDetail.name)}>
      {/* header */}
      <View style={itemPostStyle.header}>
        {/* avatar */}
        <Image source={{uri: item.avatar}} style={itemPostStyle.avatar} />
        {/* name, hour */}
        <View>
          <Text style={Typography.postName}>{item.author.fullname}</Text>
          <View style = {{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image source={item.privacy_status === 'public' ? Assets.icons.public : Assets.icons.private} style={{height: 12, width: 12}}/>
            <Text style={itemPostStyle.headerLabel}>
              {convertTimePost(item.createdAt)}
            </Text>
          </View>
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
      {item.images.length > 0 && <GridImage arrImages={item.images} />}
      {/* tag */}
      {item.tagUsers.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            marginTop: 10,
            flexWrap: 'wrap',
          }}>
          {item.tagUsers.map((item, index) => (
            <Text key={index} style={itemPostStyle.tag}>
              #{item.title}
            </Text>
          ))}
        </View>
      )}
      {item.hashtags.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            marginTop: 10,
            flexWrap: 'wrap',
          }}>
          {item.hashtags.map((item, index) => (
            <Text key={index} style={itemPostStyle.tag}>
              #{item.title}
            </Text>
          ))}
        </View>
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
          <Text style={itemPostStyle.interactLabel}>{item.likeCount}</Text>
        </TouchableOpacity>
        {/* comment */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image
            source={Assets.icons.comment}
            style={itemPostStyle.image}></Image>
          <Text style={itemPostStyle.interactLabel}>{item.commentCount}</Text>
        </TouchableOpacity>
        {/* share */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image source={Assets.image.share} style={itemPostStyle.image} />
          <Text style={itemPostStyle.interactLabel}>{item.share}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

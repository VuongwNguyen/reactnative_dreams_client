import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GridImage from './GirdImage';
import {itemPostStyle} from '../styles/components/itemPost/itemPostStyle';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {stackName} from '../navigations/screens';
import {Assets, Typography} from './../styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import AxiosInstance from '../configs/axiosInstance';
dayjs.extend(relativeTime);

const customLocale = {
  ...dayjs.Ls.vi,
  relativeTime: {
    ...dayjs.Ls.vi.relativeTime,
    future: 'in %s',
    past: '%s trước',
    s: 'vài giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
};

// Sử dụng locale tùy chỉnh
dayjs.locale(customLocale);

export default ItemPost = props => {
  const {item, } = props;
  console.log('item',item);
  
  const [like, setLike] = useState(item.isLiked);
  const [countLike, setCountLike] = useState(item.likeCount);

  const toggleLike = async () => {
    await AxiosInstance().post('/post/like-post', {
      post_id: item._id,
    })
    setLike(!like);
    if (like) {
      setCountLike(countLike - 1);
    } else {
      setCountLike(countLike + 1);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={itemPostStyle.container}>
      {/* header */}
      <View style={itemPostStyle.header}>
        {/* avatar */}
        {item?.author?.avatar && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(stackName.profile.name, {
                userViewId: item?.author?._id,
              });
            }}>
            <Image
              source={{uri: item.author?.avatar}}
              style={itemPostStyle.avatar}
            />
          </TouchableOpacity>
        )}
        {/* name, hour */}
        <View>
          <Text style={Typography.postName}>{item?.author?.fullname}</Text>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={itemPostStyle.headerLabel}>
              {dayjs(item?.createdAt).locale('vi').fromNow()}
            </Text>
            {item?.privacy_status == 'public' && (
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <View
                  style={{
                    height: 5,
                    width: 5,
                    borderRadius: 999,
                    backgroundColor: 'black',
                  }}
                />
                <Image
                  source={require('../../assets/icons/earth.png')}
                  style={{height: 15, width: 15}}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      {/* content */}
      <TouchableWithoutFeedback
        style={itemPostStyle.content}
        onPress={() =>
          navigation.navigate(stackName.postDetail.name, {post_id: item._id})
        }>
        {/* title */}
        {!!item?.title && (
          <Text numberOfLines={2} style={Typography.postTitle}>
            {item.title}
          </Text>
        )}
        {/* content */}
        <TouchableOpacity onPress={() => {}}>
          <Text numberOfLines={3} style={Typography.postContent}>
            {item?.content}
          </Text>
        </TouchableOpacity>
        {/* tag user */}
        {item?.tagUsers && item.tagUsers.length > 0 && (
          <View style={{flexDirection: 'row', gap: 5}}>
            {item.tagUsers.map((user, index) => (
              <TouchableOpacity key={index} onPress={() => {}}>
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 13,
                    textDecoration: 'underline',
                    lineHeight: 22,
                    fontWeight: '600',
                    color: '#0cbbf0',
                    textAlign: 'left',
                  }}>
                  @{user.fullname}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* hashTags */}
        <View style={{flexDirection: 'row', gap: 5}}>
          {item?.hashtags &&
            item.hashtags.length > 0 &&
            item.hashtags.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {}}>
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 13,
                    textDecoration: 'underline',
                    lineHeight: 22,
                    fontWeight: '600',
                    color: '#0cbbf0',
                    textAlign: 'left',
                  }}>
                  #{item.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </TouchableWithoutFeedback>
      {/* image */}
      {item?.images && item?.images.length > 0 && (
        <GridImage arrImages={item.images} />
      )}
      {/* interact */}
      <View style={itemPostStyle.interactContainer}>
        {/* like */}
        <TouchableOpacity
          style={itemPostStyle.itemInteract}
          onPress={() => toggleLike(!like)}>
          <Image
            style={{height: 20, width: 20}}
            source={like ? Assets.icons.heartFill : Assets.icons.heart}
          />
          <Text style={itemPostStyle.interactLabel}>{countLike}</Text>
        </TouchableOpacity>
        {/* comment */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image
            source={Assets.icons.comment}
            style={itemPostStyle.image}></Image>
          <Text style={itemPostStyle.interactLabel}>{item?.commentCount}</Text>
        </TouchableOpacity>
        {/* share */}
        <TouchableOpacity style={itemPostStyle.itemInteract}>
          <Image source={Assets.image.share} style={itemPostStyle.image} />
          <Text style={itemPostStyle.interactLabel}>{item?.share}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
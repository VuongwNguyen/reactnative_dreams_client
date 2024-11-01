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
import { useTranslation } from 'react-i18next';
import { MenuItemPost } from './MenuItemPost';
import { useDispatch } from 'react-redux';
import { APIToggleFollow } from '../store/api/FollowAPI';
import { APILikePost } from '../store/api/PostAPI';

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

export const ItemSeparator = () => (
  <View style={{height: 5, backgroundColor: '#b5b5b5'}} />
);

export default React.memo(ItemPost = props => {
  const {item, setItemClickId} = props;  
  const [liked, setLiked] = useState(item.isLiked);
  const [countLike, setCountLike] = useState(item.likeCount);
  const {t} = useTranslation();
  const [isShowMore, setIsShowMore] = useState(false);
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(item?.followedStatus);

  const toggleLike = async () => {
    dispatch(APILikePost({post_id: item._id})).then(res => {
      setLiked(!liked);
      if (liked) {
        setCountLike(countLike - 1);
      } else {
        setCountLike(countLike + 1);
      }
    });
  };

  const handleItemMenuClick = key => {
    switch (key) {
      case 'report':
        navigation.navigate(stackName.report.name, {
          post_id: item._id,
          type: 'post',
        });
        setIsShowMore(false);
        break;
      case 'edit':
        console.log('edit');
        break;
      case 'privacy':
        console.log('privacy');
        break;
      case 'delete':
        console.log('delete');
        break;
      default:
        console.log('default');
        break;
    }
  };
  
  const handleFollow = (item) => {
    dispatch(APIToggleFollow({following: item?.author?._id}));
    setIsFollowed(!isFollowed);
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
          <View style={{flexDirection:'row',gap:10,alignContent:'center',alignItems:'center'}}>
            <Text style={Typography.postName}>{item?.author?.fullname}</Text>
            {
              !isFollowed && !item?.isSelf && 
              <TouchableOpacity onPress={() => handleFollow(item)}>
                <Image style={{width:12, height:12}} source={Assets.icons.follow}/>
              </TouchableOpacity>
            }
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Text style={itemPostStyle.headerLabel}>
              {dayjs(item?.createdAt)
                .locale(t('itemPost.timeStatus'))
                .fromNow()}
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
                  source={Assets.icons.earth}
                  style={{height: 15, width: 15}}
                />
              </View>
            )}
          </View>
        </View>
        {/* more */}
        <TouchableOpacity
          onPress={() => setIsShowMore(!isShowMore)}
          style={itemPostStyle.headerMore}>
          <Image
            source={Assets.icons.more}
            style={itemPostStyle.headerMoreIcon}
          />
        </TouchableOpacity>
      </View>
      {/* content */}
      <TouchableWithoutFeedback
        style={itemPostStyle.content}
        onPress={() => {
          navigation.navigate(stackName.postDetail.name, {
            post_id: item._id,
            setItemClickId,
          });
        }}>
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
      {((item?.images && item?.images.length > 0) || (item?.videos && item?.videos.length > 0)) && (
        <GridImage arrImages={item.images} arrVideos={item.videos} />
      )}
      {/* interact */}
      <View style={itemPostStyle.interactContainer}>
        {/* like */}
        <TouchableOpacity
          style={itemPostStyle.itemInteract}
          onPress={() => toggleLike(!liked)}>
          <Image
            style={{height: 20, width: 20}}
            source={liked ? Assets.icons.heartFill : Assets.icons.heart}
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
      {/* header more modal */}
      {isShowMore && <MenuItemPost handleItemMenuClick={handleItemMenuClick} />}
    </View>
  );
});

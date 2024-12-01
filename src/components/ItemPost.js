import React, {useState} from 'react';
import {Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GridImage from './GirdImage';
import {itemPostStyle} from '../styles/components/itemPost/itemPostStyle';
import {stackName} from '../navigations/screens';
import {Assets, Typography} from './../styles';
import {useTranslation} from 'react-i18next';
import {MenuItemPost} from './MenuItemPost';
import {useDispatch} from 'react-redux';
import {APIToggleFollow} from '../store/api/FollowAPI';
import {APICreatePost, APILikePost} from '../store/api/PostAPI';
import {useDayjs} from '../configs/hooks/useDayjs';
import { setToggleLike } from '../store/slices';

export const ItemSeparator = () => (
  <View style={{height: 5, backgroundColor: '#b5b5b5'}} />
);

export default React.memo(
  (ItemPost = props => {
    const {item, setItemClickId} = props;
    const {t} = useTranslation();
    const [isShowMore, setIsShowMore] = useState(false);
    const dispatch = useDispatch();
    const [isFollowed, setIsFollowed] = useState(item?.followedStatus);

    const toggleLike = async () => {
      dispatch(APILikePost({post_id: item._id})).then(res => {
        dispatch(setToggleLike({id: item._id}));
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

    const handleFollow = item => {
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
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={Typography.postName}>{item?.author?.fullname}</Text>
              {!isFollowed && !item?.isSelf && (
                <TouchableOpacity onPress={() => handleFollow(item)}>
                  <Image
                    style={{width: 12, height: 12}}
                    source={Assets.icons.follow}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Text style={itemPostStyle.headerLabel}>
                {useDayjs(item?.createdAt)
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
        {item?.childrenPost && (
          <ItemShare item={item.childrenPost} setItemClickId={setItemClickId} />
        )}

        {/* content */}
        {item?.childrenPost ? null : (
          <View style={itemPostStyle.content}>
            <TouchableOpacity
              style={itemPostStyle.mainContent}
              onPress={() => {
                navigation.navigate(stackName.postDetail.name, {
                  post_id: item._id,
                  setItemClickId,
                });
              }}>
              {!!item?.title && (
                <Text numberOfLines={2} style={Typography.postTitle}>
                  {item.title}
                </Text>
              )}
              <Text numberOfLines={3} style={Typography.postContent}>
                {item?.content}
              </Text>
            </TouchableOpacity>

            {/* tag user */}
            {item?.tagUsers && item.tagUsers.length > 0 && (
              <View
                style={{flexDirection: 'row', gap: item?.childrenPost || 5}}>
                {item.tagUsers.map((user, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate(stackName.profile.name, {
                        userViewId: user?._id,
                      });
                    }}>
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
            {item?.hashtags && item.hashtags.length > 0 && (
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
            )}
          </View>
        )}

        {/* image */}
        {((item?.images && item?.images.length > 0) ||
          (item?.videos && item?.videos.length > 0)) && (
          <GridImage arrImages={item.images} arrVideos={item.videos} />
        )}
        {/* interact */}
        <View style={itemPostStyle.interactContainer}>
          {/* like */}
          <TouchableOpacity
            style={itemPostStyle.itemInteract}
            onPress={() => toggleLike(!item.isLiked)}>
            <Image
              style={{height: 20, width: 20}}
              source={item?.isLiked ? Assets.icons.heartFill : Assets.icons.heart}
            />
            <Text style={itemPostStyle.interactLabel}>{item?.likeCount}</Text>
          </TouchableOpacity>
          {/* comment */}
          <TouchableOpacity style={itemPostStyle.itemInteract}>
            <Image
              source={Assets.icons.comment}
              style={itemPostStyle.image}></Image>
            <Text style={itemPostStyle.interactLabel}>
              {item?.commentCount || 0}
            </Text>
          </TouchableOpacity>
          {/* share */}
          <TouchableOpacity
            style={itemPostStyle.itemInteract}
            onPress={() => {
              if (!item?.childrenPost) {
                dispatch(
                  APICreatePost({
                    children_post_id: item._id,
                  }),
                );
                ToastAndroid.show('Chia sẻ bài viết thành công !', 1000);
              } else {
                ToastAndroid.show(
                  'Đây là bài chia sẻ, không thể chia sẽ lại !',
                  ToastAndroid.SHORT,
                );
              }
            }}>
            <Image source={Assets.image.share} style={itemPostStyle.image} />
            <Text style={itemPostStyle.interactLabel}>{item?.share}</Text>
          </TouchableOpacity>
        </View>
        {/* header more modal */}
        {isShowMore && (
          <MenuItemPost handleItemMenuClick={handleItemMenuClick} isSelf={item?.isSelf}/>
        )}
      </View>
    );
  }),
);

function ItemShare({item, setItemClickId}) {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={{padding: 10, backgroundColor: '#f5f5f5', borderRadius: 10}}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#000',
          marginBottom: 10,
        }}>
        Bài viết chia sẻ
      </Text>
      <View style={{flexDirection: 'row', gap: 5, flexWrap: 'wrap'}}>
        <View>
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
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={Typography.postName}>
                  {item?.author?.fullname}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <Text style={itemPostStyle.headerLabel}>
                  {useDayjs(item?.createdAt)
                    .locale(t('itemPost.timeStatus'))
                    .fromNow()}
                </Text>
                {item?.privacy_status == 'public' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
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
          </View>
        </View>
      </View>
      <View style={itemPostStyle.content}>
        <TouchableOpacity
          style={itemPostStyle.mainContent}
          onPress={() => {
            navigation.navigate(stackName.postDetail.name, {
              post_id: item._id,
              setItemClickId,
            });
          }}>
          {!!item?.title && (
            <Text numberOfLines={2} style={Typography.postTitle}>
              {item.title}
            </Text>
          )}
          <Text numberOfLines={3} style={Typography.postContent}>
            {item?.content}
          </Text>
        </TouchableOpacity>

        {/* tag user */}
        {item?.tagUsers && item.tagUsers.length > 0 && (
          <View style={{flexDirection: 'row', gap: 5}}>
            {item.tagUsers.map((user, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate(stackName.profile.name, {
                    userViewId: user?._id,
                  });
                }}>
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
      </View>
      {/* image */}
      {((item?.images && item?.images.length > 0) ||
        (item?.videos && item?.videos.length > 0)) && (
        <GridImage arrImages={item.images} arrVideos={item.videos} />
      )}
    </View>
  );
}

import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Assets, Colors} from '../styles';
import AxiosInstance from '../configs/axiosInstance';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import {Axios} from 'axios';
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

const INITIAL_REPLIES = 0; // Hiển thị 1 reply ban đầu
const INCREMENT_REPLIES = 9;

const CommentItem = memo(props => {
  const {
    comment,
    level = 0,
    inputRef,
    commentFocus,
    setCommentFocus,
    setReplyId,
  } = props;
  const {t} = useTranslation();
  const [visibleReplies, setVisibleReplies] = useState(INITIAL_REPLIES);
  const [currentItem, setCurrentItem] = useState(comment);
  const [childComments, setChildComments] = useState([]);
  const [isHide, setIsHide] = useState(false);
  const handleViewMoreReplies = () => {
    setIsHide(true);
    getChildComment();
  };
  const handleRefInput = () => {
    inputRef.current.focus();
    setReplyId(comment._id);
  };

  const onHandleTym = () => {
    // if (!comment.isLike) {
    if (!currentItem.isLike) {
      setCurrentItem({
        ...currentItem,
        likes: currentItem.likes + 1,
        isLike: true,
      });
    } else {
      setCurrentItem({
        ...currentItem,
        likes: currentItem.likes - 1,
        isLike: false,
      });
    }
    // }
    AxiosInstance().post('/comment/like', {
      comment_id: comment._id,
    });
  };
  const onDeleteComment = () => {
    AxiosInstance().delete(`/comment/${comment._id}`);
    setCommentFocus(null);
  };

  const getChildComment = async () => {
    if (comment.childCommentCount > 0) {
      const res = await AxiosInstance().get(
        `/comment/child-comments?comment_id=${comment._id}`,
      );
      setChildComments(res.data.list);
    }
  };

  useEffect(() => {
    const fetchChildComment = async () => {
      const res = await AxiosInstance().get(
      `/comment/child-comments?comment_id=${comment._id}`,
    );
    setChildComments(res.data.list);
    }
    fetchChildComment()
  }, [comment]);

  return (
    <TouchableOpacity
      key={comment._id}
      onLongPress={() => setCommentFocus(comment._id)}
      style={[styles.container, {marginLeft: level * 10}]}>
      <View style={styles.commentRow}>
        <Image
          style={styles.avatar}
          source={{
            uri: comment?.author?.avatar?.url,
          }}
        />
        <View style={styles.commentRowContent}>
          <View style={styles.commentColumn}>
            <View style={[styles.commentRow, {alignItems: 'center'}]}>
              <Text style={styles.textUser}>{comment?.author?.fullname}</Text>
              <Text style={styles.createAt}>
                {dayjs(comment?.createdAt).locale('vi').fromNow()}
              </Text>
            </View>
            <Text style={styles.content}>{comment.content}</Text>
            <Text style={styles.textReply} onPress={handleRefInput}>
              {t('postDetailScreen.reply')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onHandleTym}
          style={{
            flexDirection: 'column',
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              currentItem.isLike ? Assets.icons.heartFill : Assets.icons.heart
            }
            style={{height: 20, width: 20}}
          />
          <Text>{currentItem.likes}</Text>
        </TouchableOpacity>
      </View>
      <>
        {comment.childCommentCount > 0 && (
          <>
            {!isHide ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleViewMoreReplies()}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <View
                    style={{
                      height: 1,
                      width: 40,
                      borderColor: '#6c757d',
                      borderWidth: 0.5,
                    }}
                  />
                  <Text style={styles.showMoreText}>
                    {t('postDetailScreen.view')}{' '}
                    {Math.min(
                      comment.childCommentCount - visibleReplies,
                      INCREMENT_REPLIES,
                    )}{' '}
                    {t('postDetailScreen.moreReplies')}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <FlatList
                  data={childComments}
                  // key={childComments?._id}
                  renderItem={({item}) => (
                    <View>
                      <CommentItem
                        key={item.id}
                        comment={item}
                        level={level + 1}
                        inputRef={inputRef}
                        setReplyId={setReplyId}
                      />
                    </View>
                  )}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={styles.replyList}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsHide(false)}>
                  <View style={[styles.commentRow, {alignItems: 'center'}]}>
                    <View style={styles.lineShow} />
                    <Text style={styles.showMoreText}>
                      {t('postDetailScreen.hideReplies')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </>

      {commentFocus === comment._id && (
        <View
          style={{
            gap: 10,
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: Colors.primary,
            borderBottomEndRadius: 5,
            borderBottomStartRadius: 5,
            borderTopStartRadius: 5,
            padding: 5,
          }}>
          <Text onPress={() => onDeleteComment()} style={{color: 'white'}}>
            Xóa
          </Text>
          <Text style={{color: 'white'}}>Cập nhật</Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
  },
  commentRow: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  commentRowContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentColumn: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: 10,
  },
  content: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
  },
  textUser: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: 'black',
  },
  createAt: {
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '500',
    color: '#6c757d',
  },
  textReply: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#6c757d',
  },
  replyList: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  button: {
    marginLeft: 50,
  },
  lineShow: {
    height: 1,
    width: 40,
    borderColor: '#6c757d',
    borderWidth: 0.5,
  },
  showMoreText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    color: '#6c757d',
  },
});

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
import {useDayjs} from '../configs/hooks/useDayjs';
import {useSelector} from 'react-redux';

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
  const childCommentData = useSelector(state => state.childComment.data);

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

  useEffect(() => {
    const onNewReplyComment = (parrentCommentId, childComment) => {
      if (parrentCommentId === comment._id) {
        setChildComments([childComment, ...childComments]);
        setVisibleReplies(visibleReplies + 1);
      }
    };
    if (childCommentData && childCommentData.length !== 0) {
      childCommentData.forEach(element => {
        const isExist = childComments.some(item => item._id === element._id);
        if (!isExist) {
          onNewReplyComment(element.reply_comment_id, element);
        }
      });
    }
  }, [childCommentData]);

  useEffect(() => {
    const fetchChildComment = async () => {
      const res = await AxiosInstance().get(
        `/comment/child-comments?comment_id=${comment._id}`,
      );
      setChildComments(res.data.list);
    };
    fetchChildComment();
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
                {useDayjs(comment?.createdAt)
                  .locale(t('itemPost.timeStatus'))
                  .fromNow()}
              </Text>
            </View>
            <Text style={styles.content}>{comment.content}</Text>
            <Text
              style={styles.textReply}
              onPress={() => {
                handleRefInput();
                setCommentFocus(comment);
              }}>
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
        {childComments.length > 0 && (
          <>
            <FlatList
              data={childComments.slice(0, visibleReplies)}
              renderItem={({item}) => (
                <View>
                  <CommentItem
                    comment={item}
                    level={level + 1}
                    inputRef={inputRef}
                    setReplyId={setReplyId}
                  />
                </View>
              )}
              keyExtractor={item => item._id}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={styles.replyList}
            />
            {childComments.length > visibleReplies ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setVisibleReplies(childComments.length)}>
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
                      childComments.length - visibleReplies,
                      INCREMENT_REPLIES,
                    )}{' '}
                    {t('postDetailScreen.moreReplies')}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setVisibleReplies(0)}>
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

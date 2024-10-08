import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Assets } from '../styles';

const INITIAL_REPLIES = 0; // Hiển thị 1 reply ban đầu
const INCREMENT_REPLIES = 9;

const CommentItem = memo(props => {
  const {comment, level = 0, inputRef} = props;
  const {t} = useTranslation();
  const [visibleReplies, setVisibleReplies] = useState(INITIAL_REPLIES);

  const handleViewMoreReplies = () => {
    setVisibleReplies(prev => prev + INCREMENT_REPLIES);
  };
  const handleHideReplies = () => {
    setVisibleReplies(INITIAL_REPLIES);
    // setShowAllReplies(false);
  };
  const handleRefInput = () => {
    inputRef.current.focus();
  };

  return (
    <View style={[styles.container, {marginLeft: level * 10}]}>
      <View style={styles.commentRow}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
          }}
        />
        <View style={styles.commentRowContent}>
          <View style={styles.commentColumn}>
            <View style={[styles.commentRow, {alignItems: 'center'}]}>
              <Text style={styles.textUser}>{comment.user}</Text>
              <Text style={styles.createAt}>{comment.createdAt}</Text>
            </View>
            <Text style={styles.content}>{comment.content}</Text>
            <Text style={styles.textReply} onPress={handleRefInput}>
              {t('postDetailScreen.reply')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Assets.icons.heart
          } style={{height: 20, width: 20}} />
          <Text>999</Text>
        </TouchableOpacity>
      </View>

      {comment.replies.length > 0 && (
        <>
          <FlatList
            data={comment.replies.slice(0, visibleReplies)}
            renderItem={({item}) => (
              <View>
                <CommentItem comment={item} level={level + 1} />
              </View>
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.replyList}
          />
          {visibleReplies < comment.replies.length && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleViewMoreReplies}>
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
                    comment.replies.length - visibleReplies,
                    INCREMENT_REPLIES,
                  )}{' '}
                  {t('postDetailScreen.moreReplies')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {visibleReplies >= comment.replies.length && (
            <TouchableOpacity style={styles.button} onPress={handleHideReplies}>
              <View style={[styles.commentRow, {alignItems: 'center'}]}>
                <View style={styles.lineShow} />
                <Text style={styles.showMoreText}>
                  {t('postDetailScreen.hideReplies')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
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

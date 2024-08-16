import React, { useState } from 'react';
import { FlatList, Image, postDetailStyleheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/Header';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Post from '../homescreen/posts/Post';
import { postDetailStyle } from '../../styles/postdetailstyle/PostDetailStyle';
import { Assets } from '../../styles';

const INITIAL_REPLIES = 0; // Hiển thị 1 reply ban đầu
const INCREMENT_REPLIES = 9;

const CommentItem = ({ comment, level = 0 }) => {
    const [visibleReplies, setVisibleReplies] = useState(INITIAL_REPLIES);
    const [showAllReplies, setShowAllReplies] = useState(false);

    const handleViewMoreReplies = () => {
        setVisibleReplies((prev) => prev + INCREMENT_REPLIES);
    };

    const handleShowAllReplies = () => {
        setVisibleReplies(comment.replies.length);
        setShowAllReplies(true);
    };

    const handleHideReplies = () => {
        setVisibleReplies(INITIAL_REPLIES);
        setShowAllReplies(false);
    };

    return (
        <View style={[postDetailStyle.commentItem,]}>
            <View style={postDetailStyle.commentRow}>
                <Image style={{ width: 40, height: 40, borderRadius: 999 }} source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg' }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', flex: 1, paddingRight: 20 }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, lineHeight: 22, fontWeight: '700', color: 'black' }}>{comment.user}</Text>
                            <Text style={{ fontSize: 13, lineHeight: 22, fontWeight: '500', color: '#6c757d' }}>{comment.createdAt}</Text>
                        </View>
                        <Text style={{ fontSize: 16, lineHeight: 22, color: '#000' }}>{comment.content}</Text>
                        <Text style={{ fontSize: 15, lineHeight: 22, fontWeight: '500', color: '#6c757d' }}>Reply</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'column', height: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name="hearto" size={20} color="black" />
                        <Text>999</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {comment.replies.length > 0 && (
                <>
                    <FlatList
                        data={comment.replies.slice(0, visibleReplies)}
                        renderItem={({ item }) => (
                            <View style={postDetailStyle.replyItem}>
                                <CommentItem comment={item} level={level + 1} />
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={postDetailStyle.replyList}

                    />
                    {!showAllReplies && visibleReplies < comment.replies.length && (
                        <TouchableOpacity style={{ marginLeft: 50, }} onPress={handleViewMoreReplies}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <View style={{ height: 1, width: 40, borderColor: '#6c757d', borderWidth: 1 }} />
                                <Text style={postDetailStyle.showMoreText}>
                                    View {Math.min(comment.replies.length - visibleReplies, INCREMENT_REPLIES)} more replies
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {visibleReplies >= comment.replies.length && (
                        <TouchableOpacity style={{ marginLeft: 50, }} onPress={handleHideReplies}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <View style={{ height: 1, width: 40, borderColor: '#6c757d', borderWidth: 1 }} />
                                <Text style={postDetailStyle.showMoreText}>
                                    Hide replies
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
};


const PostDetailScreen = () => {
    const [post, setPost] = useState(postDetail);
    return (
        <View style={postDetailStyle.container}>
            <FlatList
                style={{ flex: 1 }}
                data={comments}
                renderItem={({ item }) => <CommentItem comment={item} />}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={postDetailStyle.headerContainer}>
                            <TouchableOpacity>
                                <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={postDetailStyle.headerText}>Post</Text>
                        </View>
                        <Post
                            name={post.name}
                            date={post.date}
                            avatar={post.avatar}
                            textContent={post.textContent}
                            dataImages={post.images}
                            like={post.like}
                            comment={post.comment}
                            share={post.share}
                        />
                    </>
                }
            />
            <View style={postDetailStyle.footer}>
                <Image style={postDetailStyle.avatarFooter} source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg' }} />
                <TextInput
                    style={postDetailStyle.inputComment}
                    placeholder='Write comments'
                />
                <TouchableOpacity style={postDetailStyle.buttonSendComment} >
                    <Ionicons name='send-sharp' size={30} color='black' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostDetailScreen;



const postDetail = {
    id: 1,
    name: "user 1",
    avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
    date: '5h ago',
    textContent: 'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    images: [
        {
            uri: 'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0'
        }
    ],
    like: '1.9k',
    comment: '1.9k',
    share: '1.9k',
};

const comments = [
    {
        id: '1',
        user: 'user 1',
        content: 'How are you my friend, when are you comming home?',
        createdAt: '1h ago',
        replies: [
            {
                id: '1-1',
                user: 'user 2',
                content: 'How are you my friend, when are you comming home?',
                createdAt: '30m ago',
                replies: [
                    {
                        id: '1-1-1',
                        user: 'user4',
                        content: 'How are you my friend, when are you comming home?.How are you my friend, when are you comming home?',
                        createdAt: '15m ago',
                        replies: []
                    },
                    {
                        id: '1-1-2',
                        user: 'user 4',
                        content: 'How are you my friend, when are you comming home?',
                        createdAt: '15m ago',
                        replies: []
                    }
                ],
            },
            {
                id: '1-2',
                user: 'user 5',
                content: 'I agree as well!',
                createdAt: '25m ago',
                replies: []
            },
            {
                id: '1-3',
                user: 'user 6',
                content: 'Nice work!',
                createdAt: '20m ago',
                replies: []
            },
        ]
    },
    {
        id: '2',
        user: 'user 3',
        content: 'Great post!',
        createdAt: '2h ago',
        replies: []
    },
];

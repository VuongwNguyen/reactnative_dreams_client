import React, { useRef, useState } from 'react';
import { FlatList, Image, postDetailStyleheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Post from '../homescreen/posts/Post';
import { postDetailStyle } from '../../styles/postdetailstyle/PostDetailStyle';
import { Assets } from '../../styles';
import { useTranslation } from 'react-i18next';
import CommetItem from '../../components/CommetItem';





const PostDetailScreen = () => {
    const { t } = useTranslation();
    const inputRef = useRef(null)
    const [post, setPost] = useState(postDetail);
    return (
        <View style={postDetailStyle.container}>
            <FlatList
                style={{ flex: 1 }}
                data={comments}
                renderItem={({ item }) => <View style={{ padding: 10 }}>
                    <CommetItem comment={item} inputRef={inputRef} />
                </View>}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View style={postDetailStyle.headerContainer}>
                            <TouchableOpacity>
                                <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={postDetailStyle.headerText}>{t("postDetailScreen.post")}</Text>
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
                    ref={inputRef}
                    style={postDetailStyle.inputComment}
                    placeholder={t("postDetailScreen.writeComment")}
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

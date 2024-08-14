import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Post from './posts/Post'


const FollowedPostTab = () => {
    const [dataPosts, setDataPosts] = useState(postsData)
    const [isFollowed, , setIsFollowed] = useState(true)
    dataPosts.l
    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}
                showsVerticalScrollIndicator={false}>
                {
                    dataPosts.map(post => (
                        <Post
                            key={post.id}
                            name={post.name}
                            date={post.date}
                            avatar={post.avatar}
                            textContent={post.textContent}
                            dataImages={post.images}
                            like={post.like}
                            comment={post.comment}
                            share={post.share}
                            isFollowed={isFollowed}
                        />
                    ))
                }
            </ScrollView>
        </View >
    )
}

export default FollowedPostTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

const postsData = [
    {
        id: 1,
        name: "user 1",
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        date: '5h ago',
        textContent: 'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
        images: [],
        like: '1.9k',
        comment: '1.9k',
        share: '1.9k',
    },
    {
        id: 2,
        name: "user 2",
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        date: '5h ago',
        textContent: 'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
        images: [
            'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
            'https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_200317.jpeg'
        ],
        like: '1.9k',
        comment: '1.9k',
        share: '1.9k',
    },
    {
        id: 3,
        name: "user 3",
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        date: '5h ago',
        textContent: 'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
        images: [
            'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
            'https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_200317.jpeg'
        ],
        like: '1.9k',
        comment: '1.9k',
        share: '1.9k',
    },
    {
        id: 4,
        name: "user 4",
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        date: '5h ago',
        textContent: 'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
        images: [
            'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
        ],
        like: '1.9k',
        comment: '1.9k',
        share: '1.9k',
    }
]
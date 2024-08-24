import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-ui-lib'

const TabChatScreen = () => {
    return (
        <View style={styles.containerScreen}>
            {
                chatList.map((item, index) => (
                    <Pressable key={index}>
                        <View style={styles.itemContainer}>
                            <View style={styles.rowLeft}>
                                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                                <View style={styles.columnLeft}>
                                    <Text style={styles.textUser}>{item.name}</Text>
                                    <Text style={styles.textLastMessage}>{item.lastMessage}</Text>
                                </View>
                            </View>
                            <View style={styles.columRight}>
                                <Text styles={styles.textTime}>{item.timestamp}</Text>
                                {
                                    item.unread > 0 && (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>{item.unread}</Text>
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </Pressable>
                ))
            }
        </View>
    )
}

export default TabChatScreen

const styles = StyleSheet.create({
    containerScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 20,
        gap: 20
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderColor: '#cccccc',

    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 999,

    },
    columnLeft: {
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    columRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 5
    },
    textUser: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
    },
    textLastMessage: {
        fontSize: 16,
        color: 'black',
    },
    textTime: {
        fontSize: 13,
        color: '#6c757d',
    },
    badge: {
        width: 20,
        height: 20,
        backgroundColor: '#0CBBF0',
        borderRadius: 999,
        alignItems: 'center'
    },
    badgeText: {
        fontSize: 13,
        color: 'white'
    }
})
const chatList = [
    {
        id: 1,
        name: 'User 1',
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        lastMessage: 'Hello',
        unread: 0,
        timestamp: '2 min ago',
    },
    {
        id: 2,
        name: 'User 2',
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        lastMessage: 'Hello',
        unread: 3,
        timestamp: '2 min ago',
    },
    {
        id: 3,
        name: 'User 3',
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        lastMessage: 'Hello',
        unread: 3,
        timestamp: '2 min ago',
    },
    {
        id: 4,
        name: 'User 4',
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        lastMessage: 'Hello',
        unread: 0,
        timestamp: '2 min ago',
    },
    {
        id: 5,
        name: 'User 5',
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
        lastMessage: 'Hello',
        unread: 5,
        timestamp: '2 min ago',
    }

]
import { Dimensions, Image, Text, View } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PostStyles } from '../../../styles/poststyle/PostStyle'
import GridImage from '../../../components/GirdImage'
const { width, height } = Dimensions.get('window');



const Post = (props) => {
    const { avatar, name, date, textContent, dataImages, like, comment, share, index, isFollowed } = props
    return (
        <View style={PostStyles.postText}>
            <View style={PostStyles.headerPost}>
                <Image style={PostStyles.avatar} source={{ uri: avatar }} />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={PostStyles.footerContent}>
                            <Text style={PostStyles.name}>{name}</Text>
                            {
                                !isFollowed ?
                                    <Ionicons name="add" size={20} color="#0CBBF0" /> :
                                    <></>
                            }
                        </View>
                        <Image source={require('../../../../assets/icons/option.png')} />
                    </View>
                    <Text style={PostStyles.date}>{date}</Text>
                </View>
            </View>
            <View style={PostStyles.content}>
                <Text style={PostStyles.textContent}>
                    {textContent}
                </Text>
                {
                    dataImages.length > 0 &&
                    <GridImage arrImages={dataImages} />
                }
            </View>
            <View style={PostStyles.footerPost}>
                <View style={PostStyles.footerContent}>
                    <View style={PostStyles.footerContent}>
                        <Ionicons name="heart-outline" size={24} color="black" />
                        <Text>{like}</Text>
                    </View>
                    <View style={PostStyles.footerContent}>
                        <Fontisto name="comment" size={20} color="black" />
                        <Text>{comment}</Text>
                    </View>
                    <View style={PostStyles.footerContent}>
                        <MaterialCommunityIcons name="share-outline" size={24} color="black" />
                        <Text>{share}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Post


import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { CallStyles } from '../../styles/callstyle/CallStyle'

const CallScreen = () => {
    const [isReceiveCall, setIsReceiveCall] = useState(false)

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                <ImageBackground style={CallStyles.imgaeBackground} source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg' }} />
                <View style={CallStyles.contentContainer}>
                    <View style={CallStyles.avatarContainer}>
                        <Image style={CallStyles.avatarCall} source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg' }} />
                        <Text style={CallStyles.textUser}>User2</Text>
                        {
                            isReceiveCall ? <Text style={CallStyles.textTime}>00:05</Text> :
                                <Text style={CallStyles.textIncomingCall}>Incoming call</Text>
                        }
                    </View>
                    <View style={CallStyles.buttonContainer}>
                        {
                            isReceiveCall ?
                                <>
                                    <View style={CallStyles.groupButtonIcon}>
                                        <Pressable style={[CallStyles.wraperButtonIcon, { backgroundColor: 'white' }]}>
                                            <Feather name="mic-off" size={26} color="black" />
                                        </Pressable>
                                        <Pressable style={[CallStyles.wraperButtonIcon, { backgroundColor: 'white' }]}>
                                            <Feather name="volume-2" size={30} color="black" />
                                        </Pressable>
                                        <Pressable onPress={() => setIsReceiveCall(false)} style={[CallStyles.wraperButtonIcon, { backgroundColor: 'red' }]}>
                                            <Ionicons name="call-outline" size={30} color="white" />
                                        </Pressable>
                                    </View>
                                </>
                                :
                                <>
                                    <View style={CallStyles.groupButtonIncoming}>
                                        <Pressable style={[CallStyles.wraperButtonIconInComing, { backgroundColor: 'red' }]}>
                                            <Ionicons name="call-outline" size={40} color="white" />
                                        </Pressable>
                                        <Pressable onPress={() => setIsReceiveCall(true)} style={[CallStyles.wraperButtonIconInComing, { backgroundColor: '#4cd964' }]}>
                                            <Ionicons name="call-outline" size={40} color="white" />
                                        </Pressable>
                                    </View>
                                </>
                        }
                    </View>
                </View>
            </View>
        </View >
    )
}

export default CallScreen


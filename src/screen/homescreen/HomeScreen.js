import { Text, View, ScrollView, Image, TextInput } from 'react-native'
import React, { useRef } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TopBarNavigationHome from '../../navigations/TopBarNavigationHome';
import { HomeStyles } from '../../styles/homestyle/homestyle';
import { Assets } from '../../styles';
import { useTranslation } from 'react-i18next';




const HomeScreen = () => {
    const inputSearch = useRef(null);
    const { t } = useTranslation()
    return (
        <View style={HomeStyles.container}>
            <View style={HomeStyles.header}>
                <Image style={HomeStyles.avatar} source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg' }} />
                <View style={HomeStyles.wraperInputSearch}>
                    <TextInput
                        ref={inputSearch}
                        style={HomeStyles.inputSearch}
                        placeholder={t("homeScreen.search")}
                    />
                    <Feather
                        name={Assets.icon.search}
                        size={24} color='#6c757d'
                        style={HomeStyles.iconSearch}
                        onPress={() => { inputSearch.current.focus() }} />
                </View>
            </View>
            <TopBarNavigationHome />
        </View>
    )
}

export default HomeScreen


import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');


export const PostStyles = {
    postText: {
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    headerPost: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 999,
    },
    name: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "700",
        color: '#000',
        textAlign: "center"
    },
    date: {
        fontSize: 14,
        lineHeight: 22,
        color: '#6c757d'
    },
    textContent: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: "400",
        color: '#000',
        textAlign: "left",
        width: "100%",
    },
    footerPost: {
        marginTop: 10,
        borderTopColor: 'rgba(108, 117, 125, 0.3)',
        borderTopWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10
    },
    footerContent: {
        flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between'
    },
    swiperContainer: {
        width: '100%',
        height: height * 0.33,
        backgroundColor: '#F6F6F6',
    },
    dot: {
        backgroundColor: "gray",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        backgroundColor: '#0CBBF0',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    img: {
        width: '100%',
        height: height * 0.33,
    },
}
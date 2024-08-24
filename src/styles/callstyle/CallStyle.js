import { StyleSheet } from "react-native";

export const CallStyles = StyleSheet.create({
    imgaeBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3,
        position: 'absolute'
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    avatarCall: {
        width: 120,
        height: 120,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white'
    },
    textUser: {
        color: 'white',
        fontSize: 30,
        letterSpacing: 0,
        fontWeight: '600'
    },
    textTime: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 0,
        fontWeight: '600'
    },
    textIncomingCall: { color: 'white', fontSize: 18, letterSpacing: 0, fontWeight: '600' },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 40,
        paddingHorizontal: 40,
    },
    groupButtonIcon: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    wraperButtonIcon: {
        borderRadius: 999,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    groupButtonIncoming: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    wraperButtonIconInComing: {
        borderRadius: 999,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
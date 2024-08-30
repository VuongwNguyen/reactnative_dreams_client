

export const createGroupChatStyle = {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 35
    },
    titleHeader: {
        fontSize: 19,
        fontWeight: '600',
        color: 'black',
    },
    buttonCreate: {
        width: 80,
        height: 30,
        borderRadius: 5,
        backgroundColor: '#0cbbf0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButtonCreate: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    wraperInput: {
        width: '100%'
    },
    textInput: {
        width: '100%',
        borderBottomWidth: 2,
        borderColor: '#d9d9d9',
        fontSize: 16,
        paddingHorizontal: 10
    },
    inputSearchContainer: {
        width: '100%',
        alignItems: 'center',
    },
    wraperInputSearch: {
        width: '80%'
    },

    textInputSearch: {
        borderWidth: 1,
        borderColor: '#b1b1b1',
        borderRadius: 30,
        height: 40,
        paddingLeft: 40

    },
    iconSearch: {
        position: 'absolute',
        left: 10,
        top: 8,
    },
    itemContainer: {
        alignItems: 'center',
        gap: 5
    },
    name: {
        fontSize: 16,
        color: '#000',
    },
    textSuggest: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: "700",
        fontFamily: "NunitoSans12pt-Bold",
        color: '#6c757d',
        textAlign: "left"
    },
    itemContainerSuggest: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listCreateContainer: {
        flexDirection: 'row', gap: 15, paddingHorizontal: 10,
    },
    avatarItem: {
        width: 50, height: 50, borderRadius: 999
    },
    buttonCross: {
        position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderRadius: 999, backgroundColor: '#B1B1B1', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
    },
    textName: {
        fontSize: 16, lineHeight: 22, fontWeight: "700", color: '#000'
    },
    checkbox: {
        width: 24, height: 24, borderRadius: 999,
        justifyContent: 'center', alignItems: 'center'
    }
}
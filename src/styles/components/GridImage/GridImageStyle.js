import { StyleSheet } from "react-native";

export const GridImageStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
      },
      mainImageContainer: {
        marginBottom: 10,
      },
      mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
      },
      gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      gridImageContainer: {
        position: 'relative',
        width: '48%',
        height: 100,
      },
      gridImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
      },
      moreOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      },
      moreText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
      mainPlayIcon:{
        position: 'absolute',
        top: '45%',
        left: '45%',
        transform: [{ translateX: -12 }, { translateY: -12 }],
      },
      gridPlayIcon:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -12 }, { translateY: -12 }],
        width: 24,
        height: 24,
      }
});

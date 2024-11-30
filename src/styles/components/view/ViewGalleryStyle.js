import {Dimensions, StyleSheet} from 'react-native';

export const ViewGalleryStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    flexDirection:'row'
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
    position:'absolute',
    right:10,
    top:7
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * (19/20) - 100, // 16:9 aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  countText:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
    flex:1,
    textAlign:'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader:{
    position:'absolute',
    // top:30,
    // left:0,
    // right:0,
    // bottom:0,
    // justifyContent:'center',
    // alignItems:'center',
  }
});

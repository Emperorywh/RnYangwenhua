import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: height / 4,
    left: 0,
    right: 0,
    bottom: 200,
    alignItems: 'center',
  },
  scanLine: {
    width: width * 0.9,
    height: 0.5,
    backgroundColor: 'transparent',
  },
  shadow: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    height: 40,
  },
  closeIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  centerPointItem: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 100,
    width: 28,
    height: 28
  },
  scanDescriptioon: {
    position: 'absolute',
    bottom: 150,
    width: width,
    alignItems: 'center'
  },
  scanDescriptioonText: {
    color: '#FFF',
  },
  photoAlbumBox: {
    position: 'absolute',
    bottom: 50,
    right: 50
  },
  photoAlbumIcon: {
    backgroundColor: '#6e6e6c',
    padding: 10,
    borderRadius: 100
  },
  photoAlbumIconTextWapper: {
    alignItems: 'center',
    marginTop: 5
  },
  photoAlbumIconText: {
    color: '#FFF'
  }
});

export default styles;

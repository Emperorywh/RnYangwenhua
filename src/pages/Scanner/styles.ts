import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
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
    marginTop: 50,
    marginLeft: 20,
  },
});

export default styles;

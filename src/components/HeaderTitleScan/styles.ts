import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {},
  headerCard: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ededed',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  headerIcon: {
    position: 'absolute',
    width: 60,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIconBox: {
    position: 'relative',
  },
  roundPlusCardBackGround: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 100,
  },
  roundPlusCard: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#4C4C4C',
    borderRadius: 5,
    zIndex: 101,
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4C4C4C',
    top: -9,
    right: 15,
  },
  roundPlusList: {},
  roundPlusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  roundPlusItemPressFirst: {
    backgroundColor: '#3C3C3C',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  roundPlusItemPress: {
    backgroundColor: '#3C3C3C',
  },
  roundPlusItemPressLast: {
    backgroundColor: '#3C3C3C',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  roundPlusItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    width: 100,
    height: 50,
  },
  roundPlusItemText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default styles;

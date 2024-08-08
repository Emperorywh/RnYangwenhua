import {Modal} from '@ant-design/react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {IProps} from './index.types';

/**
 * 监听用户返回
 */
const useBackHandler = (props: IProps = {}) => {
  const navigation = useNavigation();
  const {
    title = '提示',
    content = '是否返回上一页',
    actions = [
      {text: '取消', onPress: () => {}, style: 'cancel'},
      {text: '确定', onPress: () => navigation.goBack()},
    ],
  } = props;

  useEffect(() => {
    const backAction = () => {
      Modal.alert(title, content, actions);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};

export default useBackHandler;

import {
  Action,
  CallbackOnBackHandler,
} from '@ant-design/react-native/lib/modal/PropsType';

export interface IProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  actions?: Action[];
  onBackHandler?: CallbackOnBackHandler;
}

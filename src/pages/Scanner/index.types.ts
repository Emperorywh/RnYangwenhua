import {RouteProp} from '@react-navigation/native';

export interface IProps {}

export type RootStackParamList = {
  Scanner: {onScanSuccess: (result: string) => void; onScanCancel: () => void};
};

export type ScannerRouteProp = RouteProp<RootStackParamList, 'Scanner'>;

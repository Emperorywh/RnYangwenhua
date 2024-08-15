export interface IProps {
  title: React.ReactNode;
  onScanSuccess?: (result: string) => void;
  onScanCancel?: () => void;
}

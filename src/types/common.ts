export interface ImenuItem {
  key: string;
  name: string;
  icon: React.ReactNode;
  iconActive?: React.ReactNode;
  to?: string;
  childNode?: any;
  child?: ImenuItem[];
  active?: boolean;
  isAuth?: boolean;
  isMore?: boolean;
  action?: () => void;
}
export interface IErrorsDetail {
  [x: string]: { id: string; message: string }[];
}

export interface IErrors {
  id: string;
  message: string;
  statusCode: number;
  errors: IErrorsDetail;
  detail?: string;
}

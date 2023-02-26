export interface ImenuItem {
  name: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  to?: string;
  element?: React.ReactNode;
  child?: ImenuItem[];
  active?: boolean;
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

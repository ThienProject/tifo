
export  interface ImenuItem {
    name: string;
    icon: React.ReactNode;
    iconActive: React.ReactNode;
    to?: string;
    type?: string | null | undefined;
    isChild?: boolean | null;
    active?: boolean;
    isMore?: boolean;
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
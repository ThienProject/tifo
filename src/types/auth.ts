export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadRegister extends IPayloadLogin {
  fullname: string;
  username: string;
  confirmPassword?: string;
  birthday?: Date;
}

export interface ILogin {
  id_role?: number;
  roleName: string;
}

export interface IPayloadGetUser {
  id_user: string;
  id_me?: string;
}

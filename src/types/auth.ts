export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadRegister extends IPayloadLogin {
  fullname: string;
  username: string;
}

export interface ILogin {
  id_role?: string;
  roleName: string;
}

export interface IPayloadGetUser {
  id_user: string;
  id_me?: string;
}

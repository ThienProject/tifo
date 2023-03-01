export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadRegister extends IPayloadLogin {
  fullname: string;
  username: string;
}

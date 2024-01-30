export interface ILoginUser {
  userName: string;
  password: string;
}

export interface IRegisterUser {
  userName: string;
  email: string;
  password: string;
  role: string;
  cinemaId: number;
}

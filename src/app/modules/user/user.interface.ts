
export type TUserRole =  'user' | 'admin'

export interface TUser {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  phone: string;
  address: string;
  isDeleted:boolean 
}

export type TChangePassword = {
  email : string;
  oldPassword : string;
  newPassword : string

}

export type TAuth  = {
  email: string;
  password:string
}
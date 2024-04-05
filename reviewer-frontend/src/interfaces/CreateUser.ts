export interface UserData {
    name: string;
    email: string;
    password: string;
    user: string;
    gkz: string;
    manager: string;
    type: 'ROLE_USER';
  }

 export interface User{
    name: string,
    id?: number
  }
import React, { createContext, useContext, useState } from 'react';


export type AuthProps = {
    token: string;
}

type AuthContextProps = {
    login: (token: AuthProps) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);


export const AuthProvider = ({children}: {children: React.ReactNode}) => {

  const [token, setToken] = useState<AuthProps | null>(null);

  const login = (token: AuthProps) =>{
    setToken(token)
    console.log(token)
  }

  return (
    <AuthContext.Provider value={{ login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

import React, { createContext, useState } from 'react'

interface ITodo {
    token: string,
    setterToken: (token:string)=>void
}

export const AuthContext = createContext<ITodo | null>(null);

export const  AuthProvider: React.FC<{children: React.ReactNode}> =({children}) => {

    const [token, setToken] = useState<string>("")

  

    const setterToken = (token:string)=> {
        setToken(token)
    }
    return(
        <AuthContext.Provider value={{token:token, setterToken: setterToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
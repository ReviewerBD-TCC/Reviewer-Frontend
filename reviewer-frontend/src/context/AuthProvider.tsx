import { useContext, ReactNode, useState, createContext, useEffect } from 'react';
import { UserService } from '../services/UserService';
import { UserData } from '../interfaces/CreateUser';

interface AuthContextType {
  setDetailsUser: (values: UserData) => void;
  user: UserData | null;
  accessToken: string;
  setAccessToken: (token: string | null) => void;
  active: boolean,
  setActiveValue: (active: boolean) => void;
  
}


const AuthContext = createContext<AuthContextType  | undefined>(undefined)
// const QuestionContext = createContext< | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode; 
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessTokenState] = useState<string | null>(() => localStorage.getItem('accessToken'));
  const [user, setUser] = useState<UserData | null>();
  const [active, setActive] = useState<boolean>();

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken || '');
  }, [accessToken]);

  const setAccessToken: AuthContextType['setAccessToken'] = (token) => {
    setAccessTokenState(token);
  };

  useEffect(() => {
    if (accessToken) {
      updateUser();
    }
  }, [accessToken]);

  const updateUser = async () => {
    if (accessToken) {
      try {
        const response = await UserService.userDetails(accessToken);
        setUser(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  function setDetailsUser(values: UserData) {
    setUser(values);
  }
  function setActiveValue(active: boolean){
    setActive(active)
  }

  return (
    <AuthContext.Provider value={{active, setActiveValue, accessToken, setAccessToken, setDetailsUser, user}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
export function useQuestion(){
  const context = useContext(AuthContext);
  return context
}
import { createContext, useContext, useState, ReactNode } from "react";
import { UserService } from '../services/UserService';
import { UserData } from '../interfaces/CreateUser'

interface AuthContextType {
  setDetailsUser: (values: UserData) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | undefined>();

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

  return (
    <AuthContext.Provider value={{ setDetailsUser, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

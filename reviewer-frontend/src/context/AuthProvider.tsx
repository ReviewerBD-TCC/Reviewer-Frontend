import {
  useContext,
  ReactNode,
  createContext,
 
} from "react";

import { User } from "../interfaces/UserInterfaces/CreateUser";
import { DashboardInterface } from "interfaces/DashboardInterface/Dashboard";

interface AuthContextType {
  selectedUsers: User[];
  selectUser: (selectedUsers: User) => void;

  dashboard: DashboardInterface[];
  setDashboard: (dashboard: DashboardInterface) => void;

  convertToDate: (input: Date) => Date | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const selectedUsers: User[] = [];
  const dashboard: DashboardInterface[] = [];

  function setDashboard(values: any) {
   
    if (values.length > 0 && dashboard.findIndex((item: any) => item === values) === -1) {
      console.log(values);
      dashboard.push(values);
    }
  }


  function selectUser(user: any) {
    console.log(user);
    selectedUsers.push(user);
  }

  const convertToDate = (input: Date) => {
    const date = new Date(input);
    return isNaN(date.getTime()) ? undefined : date;
  };

  return (
    <AuthContext.Provider
      value={{
        selectedUsers,
        selectUser,
        dashboard,
        setDashboard,
        convertToDate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}

export function useQuestion() {
  const context = useContext(AuthContext);
  return context;
}

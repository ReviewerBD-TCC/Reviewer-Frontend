import {
  useContext,
  ReactNode,
  useState,
  createContext,
  useEffect,
} from "react";
import { UserService } from "../services/UserService";
import { User, UserData } from "../interfaces/UserInterfaces/CreateUser";
import { DashboardInterface } from "interfaces/DashboardInterface/Dashboard";

interface AuthContextType {

  active: boolean;
  setActiveValue: (active: boolean) => void;

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
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState<UserData | null>();
  const selectedUsers: User[] = [];
  const [active, setActive] = useState<boolean>();
  const dashboard: DashboardInterface[] = [];

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken || "");
  }, [accessToken]);

  const setAccessToken: AuthContextType["setAccessToken"] = (token) => {
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

  function setDashboard(values: any) {
   
    if (values.length > 0 && dashboard.findIndex((item: any) => item === values) === -1) {
      console.log(values);
      dashboard.push(values);
    }
  }
  

  function setDetailsUser(values: UserData) {
    setUser(values);
  }
  function setActiveValue(active: boolean) {
    setActive(active);
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
        active,
        setActiveValue,
        accessToken,
        setAccessToken,
        setDetailsUser,
        user,
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

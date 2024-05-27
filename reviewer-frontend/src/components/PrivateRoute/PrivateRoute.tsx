import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useMsal } from "@azure/msal-react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
  const { accounts } = useMsal()

  if (!accounts[0]) {
    return <Navigate to="/login" />;
  }

  return children;
};

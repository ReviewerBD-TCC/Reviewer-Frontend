import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({
  children,
}: PrivateRouteProps): React.ReactElement => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

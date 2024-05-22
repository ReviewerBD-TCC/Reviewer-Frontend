import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import React from "react";
import { PublicRouteProps } from "interfaces/Geral/PublicRoute";

export const PublicRoute = ({
  children,
}: PublicRouteProps): React.ReactElement => {
  const { accessToken } = useAuth();

  if (accessToken) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
};

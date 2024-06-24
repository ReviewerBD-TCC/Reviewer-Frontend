import { Navigate } from "react-router-dom";
import React from "react";
import { PublicRouteProps } from "interfaces/Geral/PublicRoute";

export const PublicRoute = ({
  children,
}: PublicRouteProps): React.ReactElement => {

  if (5 > 0) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

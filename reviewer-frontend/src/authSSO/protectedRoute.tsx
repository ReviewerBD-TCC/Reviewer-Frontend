import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
	children: ReactNode; // ReactNode permite qualquer coisa que React possa renderizar
  }

export const ProtectedRoute = ({ children } : ProtectedRouteProps) => {
	const { accounts } = useMsal();

	if (!accounts[0]) {
		return <Navigate to="/login" />;
	}

	return children;
};

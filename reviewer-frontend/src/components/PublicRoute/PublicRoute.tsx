import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import React from "react";

interface PublicRouteProps{
    children: React.ReactNode;
}

export const PublicRoute = ({children}: PublicRouteProps): React.ReactElement =>{
    const {accessToken} = useAuth();
    console.log(accessToken)

    if(accessToken){
        return <Navigate to="/home"/>;
    }
    return <>{children}</>
}
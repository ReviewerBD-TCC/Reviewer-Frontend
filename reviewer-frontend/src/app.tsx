import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../src/authSSO/msalInstance";
// import { AuthProvider } from "context/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AppRoutes from "routes";
import { AuthProvider } from "context/AuthProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </AuthProvider>
    </MsalProvider>
  );
}

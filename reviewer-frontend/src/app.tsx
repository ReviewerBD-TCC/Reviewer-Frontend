import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../src/authSSO/msalInstance";
// import { AuthProvider } from "context/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
  
    </MsalProvider>
  );
}

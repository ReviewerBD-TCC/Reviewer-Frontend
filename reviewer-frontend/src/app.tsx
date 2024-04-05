import { AuthProvider } from "context/AuthProvider";
import { QueryClient, QueryClientProvider} from 'react-query'
import AppRoutes from "routes";

const queryClient = new QueryClient()

export default function App() {
  return (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <AppRoutes/>
    </QueryClientProvider>
  </AuthProvider>
  )
}

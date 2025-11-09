import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./components";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster id="global" expand visibleToasts={9} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

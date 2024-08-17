import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import query from "./lib/query";
import RoutesWrapper from "./routes";
import { ThemeProvider } from "./themeProvider";
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-ui-theme">
      <QueryClientProvider client={query}>
        <BrowserRouter>
          <RoutesWrapper />
        </BrowserRouter>
        <Toaster richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

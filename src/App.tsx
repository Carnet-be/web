import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import query from './lib/query';
import RoutesWrapper from './routes';
import { ThemeProvider } from './themeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-ui-theme">
      <QueryClientProvider client={query}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <BrowserRouter>
              <RoutesWrapper />
            </BrowserRouter>
            <Toaster />
          </NextThemesProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

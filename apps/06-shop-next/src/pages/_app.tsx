import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';

import { AuthProvider, CartProvider, UIProvider } from '@/context';
import { lightTheme } from '@/themes';

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

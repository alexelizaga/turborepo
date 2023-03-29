import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Cookies from 'js-cookie';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';

import { lightTheme, darkTheme, customTheme } from '@/themes';

import '@/styles/globals.css';

interface Props extends AppProps {
  theme: string
}

const App = ({ Component, pageProps, theme = 'dark' }: Props) => {

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme: Theme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
        ? darkTheme
        : customTheme
    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// App.getInitialProps = async(appContext: AppContext) => {

//   const { theme } = (appContext.ctx.req as any)?.cookies ?? 'light';
//   const validThemes = ['light', 'dark', 'custom'];

//   return {
//     theme: validThemes.includes(theme) ? theme : 'light'
//   }
// }

export default App;
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from '../themes';
import { UiProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries/EntriesProvider';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';


function MyApp({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState<boolean>(true);

  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UiProvider turnTheme={{theme, setTheme}}>
          <ThemeProvider theme={theme ? darkTheme : lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}

export default MyApp

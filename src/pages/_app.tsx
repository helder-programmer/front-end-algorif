import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/styles';
import { AuthProvider } from '@/contexts/auth';

export default function App({ Component, pageProps }: AppProps) {

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </AuthProvider>
    );

}

import App from 'next/app';
import { Provider } from '../context';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthGuard from '../components/authguard';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider attribute="class">
        <Provider>
          <Head>
            <title>yobulk</title>
          </Head>
          <UserProvider>
            <AuthGuard>
              <div className="main_container">
                <Component {...pageProps} />
              </div>
            </AuthGuard>
          </UserProvider>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default MyApp;

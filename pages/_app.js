import App from 'next/app';
import { Provider } from '../context';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react"
import AuthGuard from '../components/authguard';
class MyApp extends App {
  render() {
    const { Component, pageProps: { session, ...pageProps } } = this.props;

    return (
      <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Provider>
          <Head>
            <title>yobulk</title>
          </Head>
          <AuthGuard>
            <div className="main_container">
              <Component {...pageProps} />
            </div>
          </AuthGuard>
        </Provider>
      </ThemeProvider>
      </SessionProvider>
    );
  }
}

export default MyApp;

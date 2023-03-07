import App from 'next/app';
import { Provider } from '../context';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthGuard from '../components/authguard';
import Script from 'next/script';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-TGTCY02LKR"/>
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TGTCY02LKR', {
            page_path: window.location.pathname,
          });
        `,
        }}
    />

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
    </> 
    );
  }
}

export default MyApp;

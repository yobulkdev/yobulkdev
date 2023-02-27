import App from 'next/app';
import { Provider } from '../context';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider attribute="class">
        <Provider>
          <Head>
            <title>yobulk</title>
          </Head>
          <div className="main_container">
            <Component {...pageProps} />
          </div>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default MyApp;

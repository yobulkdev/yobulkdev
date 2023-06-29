import App from 'next/app';
import { Provider } from '../context';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider attribute="class">
        <img referrerPolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=3ff5779f-3050-4422-b718-00b09a898d58" />
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

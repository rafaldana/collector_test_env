import '../src/_mockApis';
import '../src/utils/i18n';
// CSS FILES
import 'react-quill/dist/quill.snow.css';
import './forms/form-quill/Quill.css';
import './apps/calendar/Calendar.css';
import '@components/landingpage/testimonial/testimonial.css';
import '@components/landingpage/demo-slider/demo-slider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@components/apps/userprofile/ProfileWizard/video.css';
import '@components/shared/Counter/style.css';

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { CacheProvider, EmotionCache } from '@emotion/react';
import BlankLayout from '@layouts/blank/BlankLayout';
import FullLayout from '@layouts/full/FullLayout';
import RTL from '@layouts/full/shared/customizer/RTL';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import createEmotionCache from '../src/createEmotionCache';
import Store, { AppState, useSelector } from '../src/store/Store';
import { ThemeSettings } from '../src/theme/Theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const layouts: any = {
  Blank: BlankLayout,
};

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);
  const Layout = layouts[Component.layout] || FullLayout;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title> Sammler App</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RTL>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default (props: MyAppProps) => (
  <Provider store={Store}>
    <MyApp {...props} />
  </Provider>
);

import '@/styles/css/style.css';
import '@/styles/css/tailwind.css';
import '@/styles/sass/style.scss';
import 'swiper/swiper.scss';

import PropTypes from 'prop-types';
import { SWRConfig } from 'swr';
import { NextIntlProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { DefaultLayout } from '@/components/Layouts/Default';
import { axiosRemote as axios } from '@/utils/axios';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { getLocaleNamespaces } from '@/utils/getLocaleNamespace';
import nextIntlConfig from '@/next-intl.config';
import 'dayjs/locale/ka';
import { swrConfig } from '@/api/swrConfig';
import { getAnalytics, getOpenGraph } from '@/api/shared';
import { renderScriptTags } from '@/utils/renderScriptTags';
import { GoogleAuthorization } from '@/components/Base/GoogleAuthorization';
import { FacebookSDK } from '@/components/Base/FacebookSDK';
import { PopulateData } from '@/components/Layouts/PopulateData';
import { useStore } from '../store';

const App = ({ Component, pageProps, commonMessages, messages }) => {
  const { activeLanguage, openGraph, analytics, ...pageComponentsProps } = pageProps;

  const store = useStore(pageProps.initialReduxState);

  if (axios.defaults.headers.common['Accept-Language'] !== activeLanguage) {
    axios.defaults.headers.common['Accept-Language'] = activeLanguage;
  }

  React.useEffect(() => {
    renderScriptTags(document.head, analytics.headerCodes);
    renderScriptTags(document.body, analytics.bodyCodes);
  }, []);

  const getLayout = Component.getLayout || ((page, { ...props }) => <DefaultLayout {...props}>{page}</DefaultLayout>);

  return (
    <>
      <HeaderTagsRenderer
        title={openGraph.shareTitle}
        description={openGraph.shareDescription}
        image={openGraph.shareImage && process.env.STATIC_RESOURCES_URL.concat(openGraph.shareImage)}
      >
        <meta property="og:site_name" key="ogSiteName" content={openGraph.shareTitle} />
        <meta name="keywords" key="keywords" content={openGraph.keywords} />
        <meta key="fbAppId" property="fb:app_id" content={process.env.FB_APP_ID} />
      </HeaderTagsRenderer>
      <FacebookSDK />
      <GoogleAuthorization />
      <Provider store={store}>
        <NextIntlProvider messages={{ ...commonMessages, ...messages }} {...nextIntlConfig}>
          <SWRConfig value={swrConfig}>
            <PopulateData>{getLayout(<Component {...pageComponentsProps} />, {})}</PopulateData>
          </SWRConfig>
        </NextIntlProvider>
      </Provider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const { locale = 'ka' } = ctx;
  if (!process.browser) {
    axios.defaults.headers.common['Accept-Language'] = locale;
  }

  let openGraph = null;
  let analytics = null;
  let commonMessages = null;
  if (process.browser) {
    // eslint-disable-next-line no-undef
    const { pageProps, ...rest } = __NEXT_DATA__.props;
    commonMessages = rest.commonMessages;
    openGraph = pageProps.openGraph;
    analytics = pageProps.analytics;
  } else {
    const fetchData = () => Promise.all([getOpenGraph(), getAnalytics()]);
    [openGraph, analytics] = await fetchData();
  }
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const messages = Component.localeNamespaces ? getLocaleNamespaces(locale, Component.localeNamespaces) : {};

  return {
    pageProps: {
      ...pageProps,
      activeLanguage: locale,
      openGraph,
      analytics
    },
    messages,
    commonMessages: commonMessages || getLocaleNamespaces(locale, ['common', 'errors', 'dashboard'])
  };
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
  commonMessages: PropTypes.object,
  messages: PropTypes.object
};

App.defaultProps = {
  pageProps: {},
  commonMessages: {},
  messages: {}
};

export default App;

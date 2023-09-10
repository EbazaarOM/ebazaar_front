/* eslint-disable jsx-a11y/iframe-has-title */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {process.env.FB_DOMAIN_VERIFICATION_CODE && (
            <meta name="facebook-domain-verification" content={process.env.FB_DOMAIN_VERIFICATION_CODE} />
          )}
          <meta property="og:type" key="ogType" content="website" />
          <meta name="twitter:card" key="twitterCard" content="website" />
          <meta name="twitter:site" key="twitterSite" content="@Ebazaar" />
          <meta name="twitter:creator" key="twitterCreator" content="@Leavingstone" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${process.env.GTM_ID}');
                      `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];`
            }}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

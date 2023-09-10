const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const envPath = `./env/${process.env.ENVIRONMENT}.env`;
require('dotenv').config({ path: envPath });

console.log('\x1b[36m%s\x1b[0m \x1b[0m%s \x1b[4m%s\x1b[0m', 'info', ' - Environment config is loaded from', envPath);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['ka', 'en'],
    defaultLocale: 'ka',
    localeDetection: false
  },
  webpack: (config, { webpack }) => {
    config.resolve.alias['@'] = path.join(__dirname, '');

    config.plugins.push(new ESLintPlugin({}));
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react'
      })
    );

    config.module.rules.push({
      test: /\.svg/,
      type: 'asset/inline'
    });

    return config;
  },
  images: {
    domains: [process.env.STATIC_RESOURCES_DOMAIN]
  },

  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,

    STATIC_RESOURCES_URL: process.env.STATIC_RESOURCES_URL,

    API_PRODUCTS: process.env.API_PRODUCTS,
    API_USERS: process.env.API_USERS,
    API_CONTENT: process.env.API_CONTENT,
    API_ORDERS: process.env.API_ORDERS,

    FB_APP_ID: process.env.FB_APP_ID,
    FB_PAGE_ID: process.env.FB_PAGE_ID,
    FB_DOMAIN_VERIFICATION_CODE: process.env.FB_DOMAIN_VERIFICATION_CODE,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GTM_ID: process.env.GTM_ID,
    BUY_BTN_DISABLED: process.env.BUY_BTN_DISABLED,
    ENVIRONMENT: process.env.ENVIRONMENT
  }
});

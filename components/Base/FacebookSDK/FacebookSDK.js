import Script from 'next/script';
import { renderFbChat } from '@/utils/fbUtils';

const FacebookSDK = () => {
  const onLoad = () => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.FB_APP_ID,
        autoLogAppEvents: true,
        xfbml: false,
        version: 'v11.0'
      });
      if (process.env.NODE_ENV !== 'development') {
        renderFbChat();
      }
    };
  };

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
        strategy="lazyOnload"
        onLoad={onLoad}
        crossOrigin="anonymous"
      />
    </>
  );
};

export default FacebookSDK;

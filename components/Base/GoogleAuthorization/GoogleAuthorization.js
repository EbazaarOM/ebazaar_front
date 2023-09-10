/* eslint-disable no-undef */
import loadScript from '@/utils/loadScript';

const initClient = () => {
  gapi.client
    .init({
      clientId: process.env.GOOGLE_CLIENT_ID,
      scope: 'profile email openid'
    })
    .then(() => {
      window.GoogleAuth = gapi.auth2.getAuthInstance();
    });
};

const GoogleAuthorization = () => {
  React.useEffect(() => {
    try {
      loadScript('https://apis.google.com/js/api.js', 'gapi', () => {
        gapi.load('client:auth2', initClient);
      });
    } catch (error) {
      console.log('gapi', error);
    }
  }, []);

  return null;
};

export default GoogleAuthorization;

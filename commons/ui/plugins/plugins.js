const mobileBreakpoints = ['768px', '640px', '600px', '540px', '505px', '480px', '415px', '375px', '360px', '320px'];
const desktopBreakpoints = [
  '1920px',
  '1800px',
  '1680px',
  '1600px',
  '1560px',
  '1500px',
  '1440px',
  '1366px',
  '1280px',
  '1200px',
  '1120px',
  '1080px',
  '992px'
];

const desktopRatio = 200;

const mobileRatio = 76.8;

const getFontSizeVal = (width, ratio) => `${+width.slice(0, -2) / ratio}px`;

const getOptions = (screenWidth, ratio) => ({
  screenWidth,
  fontSize: getFontSizeVal(screenWidth, ratio)
});

const getDesktopScreenOptions = (width) => getOptions(width, desktopRatio);
const getMobileScreenOptions = (width) => getOptions(width, mobileRatio);

const mobileScreens = mobileBreakpoints.map(getMobileScreenOptions);
const desktopScreens = desktopBreakpoints.map(getDesktopScreenOptions);

const mediaqueries = [...desktopScreens, ...mobileScreens].map((x) => ({
  [`@media (max-width: ${x.screenWidth})`]: {
    html: {
      fontSize: x.fontSize
    }
  }
}));

const defaultHtml = {
  html: {
    fontSize: '10px'
  }
};

const container = {
  '.container': {
    width: '81%',
    margin: '0 auto',
    '@media (max-width: 1024px)': {
      width: '90%'
    },
    '@media (max-width: 768px)': {
      padding: '0 5rem',
      width: 'auto'
    }
  }
};

module.exports = [container, defaultHtml, ...mediaqueries];

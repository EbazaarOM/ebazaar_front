/* eslint-disable no-param-reassign */
const getFbNode = () => document.getElementById('fb-root');
const getPhoneNode = () => document.getElementById('fixed-phone');

const hide = (node) => {
  if (node) {
    node.style.opacity = 0;
    node.style['pointer-events'] = 'none';
  }
};

const show = (node) => {
  if (node) {
    node.style.opacity = 1;
    node.style['pointer-events'] = 'auto';
  }
};

export const hideSiteActions = () => {
  hide(getFbNode());
  hide(getPhoneNode());
};

export const showSiteActions = () => {
  show(getFbNode());
  show(getPhoneNode());
};

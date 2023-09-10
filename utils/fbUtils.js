const customerChatOptions = {
  theme_color: '#454274',
  minimized: 'true',
  greeting_dialog_display: 'hide',
  page_id: process.env.FB_PAGE_ID
};

export const renderFbChat = () => {
  const el = document.createElement('div');
  el.setAttribute('class', 'fb-customerchat');
  Object.entries(customerChatOptions).forEach(([key, val]) => {
    el.setAttribute(key, val);
  });
  document.body.append(el);
  FB.XFBML.parse();
};

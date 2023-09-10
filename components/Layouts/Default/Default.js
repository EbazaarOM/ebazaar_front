import { useHeaderPhone } from '@/api/shared/swr';
import { AuthorizationPopup } from '@/components/Auth/AuthorizationPopup';
import { Popup } from '@/components/Base/Popup';
import { ProductPreviewPopupRenderer } from '@/components/Base/ProductPreviewPopupRenderer';
import useDisableScroll from '@/hooks/useDisableScroll';
import { setAuthPopupStatus } from '@/store/actions/base.action';
import { setProductPreview } from '@/store/actions/products.action';
import { hideSiteActions, showSiteActions } from '@/utils/siteActionsUtils';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Footer, Toolbar, FixedPhone } from './components';

const DefaultLayout = (props) => {
  const { children } = props;

  const {
    data: { phone }
  } = useHeaderPhone();

  const {
    base: { authPopupIsOpened },
    products: { productPreview }
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const router = useRouter();

  const isMobile = React.useRef(false);

  const closeAuthPopup = () => dispatch(setAuthPopupStatus(false));
  const clearProductPreview = () => dispatch(setProductPreview(null));

  const footerRef = React.useRef(null);
  const toolbarRef = React.useRef(null);

  useDisableScroll({ condition: isMobile.current && !!productPreview });

  React.useEffect(() => {
    isMobile.current = window.innerWidth < 769;
    if (window.innerWidth < 769) {
      const footer = footerRef.current;
      const toolbar = toolbarRef.current;
      const handler = ([entry]) => {
        if (entry.isIntersecting) {
          toolbar.classList.add('toolbar--hidden');
        } else {
          toolbar.classList.remove('toolbar--hidden');
        }
      };
      const observer = new IntersectionObserver(handler);
      observer.observe(footer);
      return () => observer.unobserve(footer);
    }
    return () => {};
  }, []);

  React.useEffect(() => {
    if (authPopupIsOpened) {
      hideSiteActions();
    } else {
      showSiteActions();
    }
  }, [authPopupIsOpened]);

  React.useEffect(() => {
    clearProductPreview();
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header phone={phone} />
      <div
        ref={toolbarRef}
        className="toolbar h-toolbar-size bg-white md:static fixed bottom-0 w-full z-10 md:rounded-t-0 rounded-t-40-0"
      >
        <Toolbar />
      </div>
      <main className="pb-11-0 flex-1">{children}</main>
      <div ref={footerRef}>
        <Footer />
      </div>
      {productPreview && (
        <div className="relative z-100">
          <div aria-hidden onClick={clearProductPreview} className="md:hidden fixed inset-0 bg-black opacity-40" />
          <div className="fixed md:top-20-0 md:right-10-0 top-50-percent right-50-percent md:transform-none transform translate-x-50-percent -translate-y-50-percent">
            <ProductPreviewPopupRenderer product={productPreview} onClose={clearProductPreview} />
          </div>
        </div>
      )}
      <Popup isOpened={authPopupIsOpened} className="md:w-76-5 md:h-90-percent w-full h-full" onClose={closeAuthPopup}>
        <AuthorizationPopup onClose={closeAuthPopup} />
      </Popup>
      {phone && <FixedPhone phone={phone} />}
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

const getLayout = (page, { ...props }) => {
  return <DefaultLayout {...props}>{page}</DefaultLayout>;
};
DefaultLayout.getLayout = getLayout;

export default DefaultLayout;

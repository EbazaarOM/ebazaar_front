import { Burger } from '@/components/Base/Burger';
import { CategoriesNavigation } from '@/components/Base/CategoriesNavigation';
import { Logo } from '@/components/Base/Logo';
import useDisableScroll from '@/hooks/useDisableScroll';
import { hideSiteActions, showSiteActions } from '@/utils/siteActionsUtils';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { LangSwitcher, Navigation, RegisterFarmer } from './components';

const Header = ({ phone }) => {
  const [categoriesIsVisible, setCategoriesVisibility] = React.useState(false);
  const router = useRouter();

  useDisableScroll({ condition: categoriesIsVisible });

  React.useEffect(() => {
    setCategoriesVisibility(false);
  }, [router]);

  const categoriesToggler = React.useCallback(() => {
    setCategoriesVisibility(!categoriesIsVisible);
  }, [categoriesIsVisible]);

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      if (categoriesIsVisible) {
        hideSiteActions();
      } else {
        showSiteActions();
      }
    }
  }, [categoriesIsVisible]);

  return (
    <header>
      <div className="container h-header-size relative">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <h1 title="Ebazaar">
              <Logo className="md:w-16-2 w-20-0 mr-6-6" />
            </h1>
            <Navigation
              className="md:block hidden"
              onCategoriesClick={categoriesToggler}
              categoriesIsVisible={categoriesIsVisible}
              phone={phone}
            />
          </div>
          <div className="flex items-center">
            <RegisterFarmer />
            <LangSwitcher className="ml-2-8" />
            <Burger
              isOpened={categoriesIsVisible}
              className={clsx({ 'z-99': categoriesIsVisible }, 'ml-2-7 md:hidden w-3-6 h-2-0')}
              onClick={categoriesToggler}
            />
          </div>
        </div>
        <div
          className={clsx(
            { 'opacity-0 md:translate-y-3-0 translate-x-100-percent md:translate-x-0': !categoriesIsVisible },
            'md:absolute md:top-100-percent md:w-full md:pointer-events-none z-98 transform duration-200 fixed right-0 top-0 w-70-percent md:h-auto h-full md:bg-transparent bg-white overflow-auto'
          )}
        >
          <CategoriesNavigation
            onCloseClick={categoriesToggler}
            className={clsx({ 'pointer-events-auto': categoriesIsVisible }, 'md:w-80-percent md:m-auto')}
          />
        </div>
        {categoriesIsVisible && (
          <div
            className="fixed inset-0 bg-transparent z-12"
            onClick={() => setCategoriesVisibility(false)}
            aria-hidden
          />
        )}
      </div>
      <div className="h-header-size bg-white md:hidden">
        <div className="container flex items-center h-full">
          <Navigation phone={phone} />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  phone: PropTypes.string
};

Header.defaultProps = {
  phone: ''
};

export default Header;

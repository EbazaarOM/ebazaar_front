import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IconButton } from '@/components/Base/IconButton';
import { SearchBar } from '@/components/Base/SearchBar';
import { SVG } from '@/components/Base/SVG';
import { SearchIcon } from '@/components/Vectors/SearchIcon';
import useDisableScroll from '@/hooks/useDisableScroll';
import { signInStatus } from '@/utils/constants/signInStatus';
import { toolsEnum } from '@/utils/constants/toolsEnum';
import { hideSiteActions, showSiteActions } from '@/utils/siteActionsUtils';
import { Cart, UserAuth, UserNotifications, WishList } from './components';

const Toolbar = () => {
  const [openedTool, setOpenedTool] = React.useState(null);
  const { userSignInStatus } = useSelector((state) => state.user);
  const router = useRouter();
  const [mobileSearchIsVisible, setMobileSearchVisibility] = React.useState(false);

  useDisableScroll({ condition: mobileSearchIsVisible });

  const isSignedIn = userSignInStatus === signInStatus.SIGNED_IN;

  React.useEffect(() => {
    if (openedTool) setOpenedTool(null);
    if (mobileSearchIsVisible) setMobileSearchVisibility(false);
  }, [router]);

  React.useEffect(() => {
    if (mobileSearchIsVisible) {
      hideSiteActions();
    } else {
      showSiteActions();
    }
  }, [mobileSearchIsVisible]);

  const toggler = (tool) => setOpenedTool(openedTool === tool ? null : tool);

  return (
    <div className="container flex items-center h-full relative">
      <SearchBar
        className="md:flex-1 md:mr-33-6"
        visibleOnMobile={mobileSearchIsVisible}
        onClose={() => setMobileSearchVisibility(false)}
      />
      <div
        className={clsx(
          { 'z-2': openedTool },
          'flex items-center relative md:w-auto w-full md:justify-start justify-between'
        )}
      >
        <IconButton className="bg-blue w-9-0 h-9-0 md:hidden" onClick={() => setMobileSearchVisibility(true)}>
          <SVG src={SearchIcon} className="w-3-2 text-body-bg" />
        </IconButton>
        {isSignedIn && (
          <UserNotifications
            className="mr-3-0 md:block hidden"
            opened={openedTool === toolsEnum.NOTIFICATIONS}
            toggle={() => toggler(toolsEnum.NOTIFICATIONS)}
          />
        )}
        <UserAuth
          className="md:mr-3-0"
          isSignedIn={isSignedIn}
          opened={openedTool === toolsEnum.USERTOOLS}
          toggle={() => toggler(toolsEnum.USERTOOLS)}
        />
        <WishList
          className="md:mr-3-0"
          userSignInStatus={userSignInStatus}
          opened={openedTool === toolsEnum.WISHLIST}
          toggle={() => toggler(toolsEnum.WISHLIST)}
        />
        <Cart
          userSignInStatus={userSignInStatus}
          opened={openedTool === toolsEnum.CART}
          toggle={() => toggler(toolsEnum.CART)}
        />
      </div>
      <div className="user-toolbar">
        <div
          id="user-toolbar-portal"
          className={clsx(
            { 'user-toolbar__portal--usertool': openedTool === toolsEnum.USERTOOLS },
            'user-toolbar__portal'
          )}
        />
      </div>
      {openedTool && (
        <div className="fixed w-full h-full top-0 left-0 z-1" aria-hidden onClick={() => setOpenedTool(null)} />
      )}
    </div>
  );
};

export default Toolbar;

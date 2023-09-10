import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { ebazaarUserRefreshToken } from '@/utils/constants/cookieNames';
import { signInStatus } from '@/utils/constants/signInStatus';
import { removeAuthTokens } from '@/utils/removeAuthTokens';
import { enableResponseInterceptors } from '@/utils/axios';
import Router from 'next/router';
import { refreshToken } from '@/api/user/account';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, setUserSignInStatus } from '@/store/actions/user.action';

const LoadInitialData = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const { userSignInStatus } = useSelector((state) => state.user);

  const tryRefreshToken = async (refreshTok) => {
    try {
      const { token } = await refreshToken({ refreshToken: refreshTok });
      return token;
    } catch {
      return false;
    }
  };

  const handleUnauthorized = React.useCallback(() => {
    removeAuthTokens();
    dispatch(setUserSignInStatus(signInStatus.SIGNED_OUT));
    Router.push('/');
  }, []);

  // Init user
  const initUser = async () => {
    const refreshToken = Cookies.get(ebazaarUserRefreshToken);
    if (refreshToken) {
      const tokenResponse = await tryRefreshToken(refreshToken);
      if (tokenResponse) {
        dispatch(logInUser(tokenResponse));
        return;
      }
    }
    removeAuthTokens();
    dispatch(setUserSignInStatus(signInStatus.SIGNED_OUT));
  };

  React.useEffect(() => {
    initUser();
  }, []);

  React.useEffect(() => {
    if (userSignInStatus === signInStatus.SIGNED_IN) {
      enableResponseInterceptors({ handleUnauthorized });
    }
  }, [userSignInStatus]);

  return children;
};

LoadInitialData.propTypes = {
  children: PropTypes.node.isRequired
};

export default LoadInitialData;

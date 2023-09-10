import { setBreadcrumb } from '@/store/actions/base.action';
import { useDispatch } from 'react-redux';

export const useBreadcrumbDispatcher = (breadcrumb) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
  }, []);
};

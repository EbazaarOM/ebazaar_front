import { Button } from '@/components/Base/Button';
import { CircleIcon } from '@/components/Base/CircleIcon';
import { RouterLink } from '@/components/Base/RouterLink';
import { SVG } from '@/components/Base/SVG';
import { XIcon } from '@/components/Vectors/XIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { signInStatus } from '@/utils/constants/signInStatus';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const FailPage = () => {
  const router = useRouter();
  const { userSignInStatus } = useSelector((state) => state.user);

  const t = useTranslations(['order']);

  React.useEffect(() => {
    if (userSignInStatus === signInStatus.SIGNED_OUT) {
      router.push('/');
    }
  }, [userSignInStatus]);

  if (userSignInStatus !== signInStatus.SIGNED_IN) return null;

  return (
    <div className="md:mt-5-4 md:w-80-percent m-auto">
      <div className="md:bg-white">
        <div className="flex flex-col items-center pt-2-0 pb-6-0 md:px-0 px-5-0">
          <div className="font-bd md:text-3-0 text-4-0 md:w-40-percent w-80-percent text-center">{t('orderError')}</div>
          <CircleIcon className="md:w-5-6 w-7-8 md:h-5-6 h-7-8 text-red md:mt-2-0 mt-4-0 border-2 border-current">
            <SVG className="w-2-4" src={XIcon} />
          </CircleIcon>
        </div>
      </div>
      <RouterLink href="/" className="mt-4-0 m-auto w-mc block">
        <Button className="bg-blue hover:opacity-90 text-white duration-150">{t('goToHomepage')}</Button>
      </RouterLink>
    </div>
  );
};

FailPage.localeNamespaces = ['order'];

export default FailPage;

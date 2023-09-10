import { ErrorComponent } from '@/components/Base/ErrorComponent';
import { useRouter } from 'next/router';

const message = {
  ka: 'სამწუხაროდ, გვერდი არ მოიძებნა!',
  en: 'Page not found!'
};

const Custom404 = () => {
  const { locale } = useRouter();

  return <ErrorComponent statusCode={404} message={message[locale]} />;
};

export default Custom404;

import { useRouter } from 'next/router';

const useSiteUrl = () => {
  const { asPath, locale } = useRouter();

  const prefix = locale === 'en' ? '/en' : '';

  const siteUrl = process.env.FRONTEND_URL?.slice(0, -1) + prefix + asPath;
  return siteUrl;
};

export default useSiteUrl;

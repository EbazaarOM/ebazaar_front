import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { PageWrapper } from '@/components/Base/PageWrapper';
import { getSinglePage } from '@/api/content';
import { useDispatch } from 'react-redux';
import { setBreadcrumb, setNextLanguageRoute } from '@/store/actions/base.action';
import { useRouter } from 'next/router';

const Page = ({ content }) => {
  const breadcrumb = [{ href: `/page/${content.slug}`, title: content.title }];
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    const nextLanguage = router.locale === 'ka' ? 'en' : 'ka';
    const { slug = '' } = content.languageSlugs.find((x) => x.languageCode === nextLanguage) || {};
    dispatch(setNextLanguageRoute(slug ? `/page/${slug}` : null));

    dispatch(setBreadcrumb(breadcrumb));

    return () => dispatch(setNextLanguageRoute(null));
  }, [content.slug]);

  return <PageWrapper title={content.title} description={content.description} />;
};

Page.propTypes = {
  content: PropTypes.object
};

Page.defaultProps = {
  content: {}
};

Page.getInitialProps = async ({ query }) => {
  const { slug } = query;

  const content = await getSinglePage(encodeURIComponent(slug));

  return {
    content
  };
};

Page.getLayout = PageLayout.getLayout();

export default Page;

import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { PageWrapper } from '@/components/Base/PageWrapper';
import { getPageOpenGraphs, getTermsAndConditions } from '@/api/content';

const TermsAndConditions = ({ content, ogTags }) => {
  useBreadcrumbDispatcher([{ href: '/terms-and-conditions', title: content.title }]);

  return <PageWrapper ogTags={ogTags} title={content.title} description={content.description} />;
};

TermsAndConditions.propTypes = {
  content: PropTypes.object,
  ogTags: PropTypes.object
};

TermsAndConditions.defaultProps = {
  content: {},
  ogTags: PropTypes.object
};

TermsAndConditions.getInitialProps = async ({ pathname }) => {
  const fetchData = () => Promise.all([getTermsAndConditions(), getPageOpenGraphs(pathname)]);
  const [content, ogTags] = await fetchData();

  return {
    content,
    ogTags
  };
};

TermsAndConditions.getLayout = PageLayout.getLayout();

export default TermsAndConditions;

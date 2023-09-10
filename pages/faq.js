import { getFaq, getFaqContent, getPageOpenGraphs } from '@/api/content';
import { SingleFaq } from '@/components/Base/SingleFaq';
import { Pagination } from '@/components/Base/Pagination';
import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { PageWrapper } from '@/components/Base/PageWrapper';

const PER_PAGE = 6;

const Faq = ({ content, ogTags, items, total }) => {
  const router = useRouter();

  useBreadcrumbDispatcher([{ href: '/faq', title: content.title }]);

  return (
    <PageWrapper ogTags={ogTags} title={content.title} description={content.description}>
      <div className="md:mt-5-0 mt-6-0">
        {items?.map((x) => (
          <SingleFaq key={x.id} item={x} className="md:mb-3-0 mb-4-0 last:mb-0" />
        ))}
      </div>
      {total > PER_PAGE && (
        <div className="mt-9-6 flex justify-end">
          <Pagination
            page={+router.query.page || 1}
            onPageChange={(nextPage) =>
              router.push({ pathname: router.pathname, query: { ...router.query, page: nextPage } })
            }
            pageCount={total / PER_PAGE}
          />
        </div>
      )}
    </PageWrapper>
  );
};

Faq.propTypes = {
  content: PropTypes.object,
  ogTags: PropTypes.object,
  items: PropTypes.instanceOf(Array),
  total: PropTypes.number
};

Faq.defaultProps = {
  content: {},
  ogTags: {},
  items: [],
  total: 0
};

Faq.getInitialProps = async ({ query, pathname }) => {
  const { page = 1 } = query;

  const fetchData = () =>
    Promise.all([
      getPageOpenGraphs(pathname),
      getFaqContent(),
      getFaq({ take: PER_PAGE, skip: (+page - 1) * PER_PAGE })
    ]);

  const [ogTags, content, { items, total }] = await fetchData();

  return {
    ogTags,
    content,
    items,
    total
  };
};

Faq.getLayout = PageLayout.getLayout();

export default Faq;

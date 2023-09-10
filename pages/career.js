import { getCareerContent, getPageOpenGraphs, getVacancies } from '@/api/content';
import { Pagination } from '@/components/Base/Pagination';
import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { SingleVacancy } from '@/components/Base/SingleVacancy';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { PageWrapper } from '@/components/Base/PageWrapper';
import { useTranslations } from '@/next-intl/useTranslations';

const PER_PAGE = 12;

const Career = ({ content, ogTags, items, total }) => {
  const router = useRouter();

  useBreadcrumbDispatcher([{ href: '/career', title: content.title }]);

  const t = useTranslations();

  return (
    <PageWrapper ogTags={ogTags} title={content.title} description={content.description}>
      <div className="font-md md:text-2-0 text-3-0 mt-3-0">{t('vacancies')}</div>
      <div className="md:mt-7-0 mt-3-0">
        {items?.map((x) => (
          <SingleVacancy
            key={x.id}
            item={x}
            className="mb-4-0 last:mb-0"
            buttonText={t('sendCV')}
            email={content.email}
          />
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

Career.propTypes = {
  content: PropTypes.object,
  ogTags: PropTypes.object,
  items: PropTypes.instanceOf(Array),
  total: PropTypes.number
};

Career.defaultProps = {
  content: {},
  ogTags: {},
  items: [],
  total: 0
};

Career.getInitialProps = async ({ query, pathname }) => {
  const { page = 1 } = query;

  const fetchData = () =>
    Promise.all([
      getPageOpenGraphs(pathname),
      getCareerContent(),
      getVacancies({ take: PER_PAGE, skip: (+page - 1) * PER_PAGE })
    ]);

  const [ogTags, content, { items, total }] = await fetchData();

  return {
    content,
    ogTags,
    items,
    total
  };
};

Career.getLayout = PageLayout.getLayout();

export default Career;

import { getAboutContent, getPageOpenGraphs, getTeamMembers } from '@/api/content';
import { Pagination } from '@/components/Base/Pagination';
import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { SingleTeamMember } from '@/components/Base/SingleTeamMember';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { PageWrapper } from '@/components/Base/PageWrapper';
import { useTranslations } from '@/next-intl/useTranslations';

const PER_PAGE = 12;

const About = ({ content, ogTags, items, total }) => {
  const router = useRouter();

  useBreadcrumbDispatcher([{ href: '/about', title: content.title }]);

  const t = useTranslations();

  return (
    <PageWrapper ogTags={ogTags} title={content.title} description={content.description}>
      <div className="font-md text-2-0 mt-3-0 md:block hidden">{t('teamMembers')}</div>
      <div className="md:mt-7-0 mt-3-0 grid md:grid-cols-3 grid-cols-2 md:gap-x-3-0 gap-x-2-0 md:gap-y-6-0 gap-y-4-5">
        {items?.map((x) => (
          <SingleTeamMember key={x.id} item={x} />
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

About.propTypes = {
  content: PropTypes.object,
  ogTags: PropTypes.object,
  items: PropTypes.instanceOf(Array),
  total: PropTypes.number
};

About.defaultProps = {
  content: {},
  ogTags: {},
  items: [],
  total: 0
};

About.getInitialProps = async ({ query, pathname }) => {
  const { page = 1 } = query;

  const fetchData = () =>
    Promise.all([
      getPageOpenGraphs(pathname),
      getAboutContent(),
      getTeamMembers({ take: PER_PAGE, skip: (+page - 1) * PER_PAGE })
    ]);

  const [ogTags, content, { items, total }] = await fetchData();

  return {
    ogTags,
    content,
    items,
    total
  };
};

About.getLayout = PageLayout.getLayout();

export default About;

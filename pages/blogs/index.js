import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { SingleBlog } from '@/components/Base/SingleBlog';
import { Pagination } from '@/components/Base/Pagination';
import { useRouter } from 'next/router';
import { DatePicker } from '@/components/Base/DatePicker';
import { getBlogs } from '@/api/blogs';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { useTranslations } from '@/next-intl/useTranslations';
import { getPageOpenGraphs } from '@/api/content';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const PER_PAGE = 6;

const Blogs = ({ items, total, ogTags }) => {
  const t = useTranslations();
  useBreadcrumbDispatcher([{ href: '/blogs', title: t('blog') }]);
  const router = useRouter();

  return (
    <>
      <HeaderTagsRenderer
        title={t('blog')}
        metaTitle={ogTags.shareTitle}
        description={ogTags.shareDescription}
        image={ogTags.shareImage && process.env.STATIC_RESOURCES_URL.concat(ogTags.shareImage)}
      />
      <div className="md:bg-white w-full md:px-5-0 md:pt-2-7 md:pb-2-5 flex justify-between items-center">
        <div className="font-md text-3-0 upper md:block hidden">{t('blog')}</div>
        <DatePicker
          dateRange={{ from: router.query.from, to: router.query.to }}
          onSelect={(vals) => router.push({ query: { ...vals } })}
          format="DD/MM/YY"
          placeholder={t('filterByDate')}
          className="md:w-33-6 w-full"
          withClearIcon
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-x-3-0 md:gap-y-6-0 gap-y-5-5 mt-5-0">
        {items?.map((x) => (
          <SingleBlog key={x.id} item={x} className="md:border-none border-b-2 border-grey-200 md:pb-0 pb-5-0" />
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
            color="secondary"
          />
        </div>
      )}
    </>
  );
};

Blogs.propTypes = {
  items: PropTypes.instanceOf(Array),
  ogTags: PropTypes.object,
  total: PropTypes.number
};

Blogs.defaultProps = {
  items: [],
  ogTags: {},
  total: 0
};

Blogs.getInitialProps = async ({ query, pathname }) => {
  const { page = 1, ...restQuery } = query;

  const fetchData = () =>
    Promise.all([
      getPageOpenGraphs(pathname),
      getBlogs({ take: PER_PAGE, skip: (+page - 1) * PER_PAGE, ...restQuery })
    ]);

  const [ogTags, { items, total }] = await fetchData();

  return {
    ogTags,
    items,
    total
  };
};

Blogs.getLayout = PageLayout.getLayout({ hasShare: false });

export default Blogs;

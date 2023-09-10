import PropTypes from 'prop-types';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { PageLayout } from '@/components/Layouts/PageLayout';
import { CalendarIcon } from '@/components/Vectors/CalendarIcon';
import { SVG } from '@/components/Base/SVG';
import { DynamicContent } from '@/components/Base/DynamicContent';
import { SingleBlog } from '@/components/Base/SingleBlog';
import { BlogGallery } from '@/components/Base/BlogGallery';
import { getSingleBlog } from '@/api/blogs';
import { useNextBlogs } from '@/api/blogs/swr';
import { useTranslations } from '@/next-intl/useTranslations';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { setBreadcrumb, setNextLanguageRoute } from '@/store/actions/base.action';

const BlogBySlug = ({ details }) => {
  const t = useTranslations();
  const router = useRouter();

  const dispatch = useDispatch();

  const breadcrumb = [
    { href: '/blogs', title: t('blog') },
    { href: `/blogs/${details.slug}`, title: details.title }
  ];

  React.useEffect(() => {
    const nextLanguage = router.locale === 'ka' ? 'en' : 'ka';
    const { slug = '' } = details.languageSlugs.find((x) => x.languageCode === nextLanguage) || {};
    dispatch(setNextLanguageRoute(slug ? `/blogs/${slug}` : null));

    dispatch(setBreadcrumb(breadcrumb));

    return () => dispatch(setNextLanguageRoute(null));
  }, [details.slug]);

  const { data: nextBlogs } = useNextBlogs(details.id);

  return (
    <>
      <HeaderTagsRenderer
        title={details.title}
        metaTitle={details.shareTitle}
        description={details.shareDescription}
        image={details.shareImage && process.env.STATIC_RESOURCES_URL.concat(details.shareImage)}
      />
      {details.coverImage && (
        <div className="h-30-1 relative -mx-5-0 md:mx-0">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(details.coverImage)}
            alt={details.title}
            loading="eager"
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
      <div className="flex items-center justify-between mt-4-5">
        <div className="text-3-0 font-md upper">{details.title}</div>
        <div className="flex items-center text-grey">
          <SVG src={CalendarIcon} className="md:w-2-4 w-3-2 md:mr-1-3 mr-2-0" />
          <span className="font-lt md:text-2-0 text-2-6 upper">{dayjs(details.createDate).format('DD.MM.YYYY')}</span>
        </div>
      </div>
      <DynamicContent className="mt-3-0" description={details.description} />

      {details.gallery && details.gallery.length > 0 && (
        <>
          <div className="text-3-0 font-md mt-7-0 upper">{t('gallery')}</div>
          <BlogGallery className="md:mt-5-0 mt-4-0" items={details.gallery} />
        </>
      )}
      <div className="text-3-0 font-md md:mt-11-0 mt-7-0 upper">{t('nextBlog')}</div>
      <div className="grid md:grid-cols-2 md:gap-3-0 gap-5-5 mt-3-5">
        {nextBlogs?.map((x) => (
          <SingleBlog key={x.id} item={x} />
        ))}
      </div>
    </>
  );
};

BlogBySlug.propTypes = {
  details: PropTypes.object
};

BlogBySlug.defaultProps = {
  details: {}
};

BlogBySlug.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const details = await getSingleBlog(encodeURIComponent(slug));

  return {
    details
  };
};

BlogBySlug.getLayout = PageLayout.getLayout();

export default BlogBySlug;

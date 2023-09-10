import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { DefaultLayout } from '@/components/Layouts/Default';
import { Breadcrumb } from '@/components/Base/Breadcrumb';
import { ArticleTools } from '@/components/Base/ArticleTools';
import { RouterLink } from '@/components/Base/RouterLink';
import { useTranslations } from '@/next-intl/useTranslations';

const PageLayout = ({ children, hasShare }) => {
  const { breadcrumb } = useSelector((state) => state.base);

  const t = useTranslations();

  return (
    <div className="container">
      <div className="md:flex items-center justify-between py-3-0">
        <div className="mobile-full-view-scrollable-container overflow-auto hide-scrollbar">
          <Breadcrumb className="mobile-full-view-scrollable-container__items">
            <RouterLink href="/">{t('home')}</RouterLink>
            {breadcrumb?.map((x) => (
              <RouterLink key={JSON.stringify(x.href)} href={x.href}>
                {x.title}
              </RouterLink>
            ))}
          </Breadcrumb>
        </div>

        {hasShare && (
          <div className="font-rm text-1-8 flex items-center md:mt-0 mt-5-0">
            <span className="md:inline hidden">{t('share')}</span>
            <ArticleTools className="md:ml-2-6" />
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hasShare: PropTypes.bool
};

PageLayout.defaultProps = {
  hasShare: true
};

PageLayout.getLayout =
  (layoutProps = {}) =>
  (page, { ...props }) =>
    DefaultLayout.getLayout(<PageLayout {...layoutProps}>{page}</PageLayout>, {
      ...props
    });

export default PageLayout;

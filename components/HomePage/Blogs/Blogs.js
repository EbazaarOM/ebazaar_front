import { RouterLink } from '@/components/Base/RouterLink';
import { SingleBlog } from '@/components/Base/SingleBlog';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Blogs = ({ className, items }) => {
  const t = useTranslations();
  return (
    <div className={clsx(className, 'products-section')}>
      <RouterLink href="/blogs" className="flex items-center w-mc mr-3-0 group">
        <h3 className="text-3-6 font-md upper md:tracking-normal tracking-tight mr-2-0">{t('blogs')}</h3>
        <SVG
          src={ArrowDownIcon}
          className="w-2-0 transform -rotate-90 group-hover:translate-x-1-0 group-hover:opacity-100 opacity-0 duration-150"
        />
      </RouterLink>
      <div className="grid md:grid-cols-2 gap-3-0 mt-6-0">
        {items &&
          items.map((x) => (
            <SingleBlog
              key={x.id}
              item={x}
              className="md:border-none border-b-2 last:border-0 border-grey-200 md:pb-0 pb-5-0"
            />
          ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  className: PropTypes.string,
  items: PropTypes.instanceOf(Array)
};

Blogs.defaultProps = {
  className: '',
  items: []
};

export default Blogs;

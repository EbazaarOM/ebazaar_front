import clsx from 'clsx';
import PropTypes from 'prop-types';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { DynamicContent } from '../DynamicContent';

const PageWrapper = ({ className, title, description, ogTags, children }) => {
  return (
    <>
      <HeaderTagsRenderer
        title={title}
        metaTitle={ogTags.shareTitle}
        description={ogTags.shareDescription}
        image={ogTags.shareImage && process.env.STATIC_RESOURCES_URL.concat(ogTags.shareImage)}
      />
      <div className={clsx(className, 'md:px-13-0 px-5-0 md:pt-7-0 pt-5-0 pb-9-0 bg-white')}>
        <div className="font-md text-3-0 upper">{title}</div>
        <DynamicContent className="md:mt-3-5 mt-3-0" description={description} />
        {children}
      </div>
    </>
  );
};

PageWrapper.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  ogTags: PropTypes.object
};

PageWrapper.defaultProps = {
  className: '',
  title: '',
  description: '',
  children: null,
  ogTags: {}
};

export default PageWrapper;

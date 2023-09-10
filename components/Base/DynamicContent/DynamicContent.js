import PropTypes from 'prop-types';
import clsx from 'clsx';

const DynamicContent = (props) => {
  const { className, description } = props;

  const result = description?.replace(/&nbsp;/g, ' ');

  return (
    <div className={clsx(className, 'md:text-1-8 text-2-8 font-lt dynamic-content')}>
      <div dangerouslySetInnerHTML={{ __html: result || '' }} />
    </div>
  );
};

DynamicContent.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string
};

DynamicContent.defaultProps = {
  className: '',
  description: ''
};

export default DynamicContent;

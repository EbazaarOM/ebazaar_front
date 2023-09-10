import PropTypes from 'prop-types';
import { IconButton } from '@/components/Base/IconButton';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { SVG } from '@/components/Base/SVG';
import clsx from 'clsx';

const BackButton = (props) => {
  const { className, title, onClick } = props;

  return (
    <div className={clsx(className, 'flex items-center')}>
      <IconButton
        className="bg-body-bg md:w-3-0 md:h-3-0 w-7-2 h-7-2 hover:bg-grey-200 duration-150 md:mr-1-5 mr-2-0"
        onClick={onClick}
      >
        <SVG src={ArrowDownIcon} className="md:w-1-0 w-2-2 transform rotate-90 -translate-x-0-1" />
      </IconButton>
      <div className="md:text-1-8 text-2-8 font-rm">{title}</div>
    </div>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string
};

BackButton.defaultProps = {
  onClick: () => {},
  className: '',
  title: ''
};

export default BackButton;

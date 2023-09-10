import { SVG } from '@/components/Base/SVG';
import { CircledTick } from '@/components/Vectors/CircledTick';
import { XIcon } from '@/components/Vectors/XIcon';
import PropTypes from 'prop-types';

const SuccessBox = ({ title, headerTitle, onClose, description }) => {
  return (
    <div className="w-full h-full">
      {headerTitle && (
        <div className="md:h-10-0 h-15-0 flex items-center justify-between border-solid px-4-0 font-md text-2-0 border-b border-grey-200 bg-white z-1 transform -translate-y-0-1">
          <span className="upper md:text-2-0 text-3-0">{headerTitle}</span>
          <SVG
            src={XIcon}
            className="md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-150"
            onClick={onClose}
          />
        </div>
      )}
      <div className="md:p-2-0 p-5-0 pb-4-0 flex flex-col items-center">
        {title && <div className="font-rm md:text-3-0 text-4-0 text-center">{title}</div>}
        <SVG className="md:w-8-5 w-13-0 text-green mt-7-0" src={CircledTick} />
      </div>
      {description && <div className="mt-7-0 md:text-2-0 text-3-0 text-center font-lt">{description}</div>}
    </div>
  );
};

SuccessBox.propTypes = {
  title: PropTypes.node,
  headerTitle: PropTypes.string,
  onClose: PropTypes.func,
  description: PropTypes.string
};

SuccessBox.defaultProps = {
  title: null,
  headerTitle: '',
  onClose: () => {},
  description: ''
};

export default SuccessBox;

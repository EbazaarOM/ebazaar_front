import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SVG } from '@/components/Base/SVG';
import { XIcon } from '@/components/Vectors/XIcon';

const AuthorizationPopup = (props) => {
  const { className, onClose, title, icon, children } = props;

  return (
    <div className={clsx(className, 'w-full h-full relative')}>
      <div className="g-c h-full bg-white">
        <div className="md:h-10-0 h-15-0 flex items-center justify-between border-solid md:px-4-0 px-5-0 font-md md:text-2-0 text-2-8 bg-white z-1 transform -translate-y-0-1">
          <div className="flex items-center">
            {icon}
            <span className="upper">{title}</span>
          </div>
          <SVG
            src={XIcon}
            className="md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-200"
            onClick={onClose}
          />
        </div>
        <div className="md:px-4-0 px-5-0 overflow-auto custom-scrollbar flex flex-col">{children}</div>
        <div className="absolute md:top-10-0 top-15-0 left-0 right-0 h-0-1 bg-grey-200" />
      </div>
      <style jsx>{`
        .g-c {
          display: grid;
          grid-template-rows: max-content 1fr;
        }
      `}</style>
    </div>
  );
};

AuthorizationPopup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func
};

AuthorizationPopup.defaultProps = {
  className: '',
  title: '',
  icon: null,
  children: null,
  onClose: () => {}
};

export default AuthorizationPopup;

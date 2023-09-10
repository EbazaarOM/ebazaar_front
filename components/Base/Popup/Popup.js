import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useDisableScroll from '@/hooks/useDisableScroll';
import { hideSiteActions, showSiteActions } from '@/utils/siteActionsUtils';

const Popup = React.forwardRef((props, ref) => {
  const { children, onClose, className, isOpened } = props;
  const [opened, setOpened] = React.useState(false);

  useDisableScroll({ condition: opened || isOpened });

  const closeHandler = () => {
    onClose();
    if (opened) setOpened(false);
    showSiteActions();
  };

  const openHandler = () => {
    setOpened(true);
    hideSiteActions();
  };

  React.useImperativeHandle(ref, () => ({
    open() {
      openHandler();
    },
    close() {
      closeHandler();
    }
  }));

  const bg = (
    <div
      tabIndex="0"
      role="grid"
      onKeyUp={(e) => e.key === 'Escape' && closeHandler}
      onClick={closeHandler}
      className="fixed inset-0 bg-black opacity-40"
    />
  );

  const nodeToRender = (
    <div className="relative z-99">
      {bg}
      <div
        className={clsx(
          className,
          'popup-body fixed top-50-percent left-50-percent transform -translate-x-50-percent -translate-y-50-percent flex justify-center items-center'
        )}
      >
        {children}
      </div>
    </div>
  );
  return <>{process.browser && (opened || isOpened) && ReactDOM.createPortal(nodeToRender, document.body)}</>;
});

Popup.displayName = 'Popup';
Popup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  isOpened: PropTypes.bool
};
Popup.defaultProps = {
  className: '',
  onClose: () => {},
  isOpened: false
};

export default Popup;

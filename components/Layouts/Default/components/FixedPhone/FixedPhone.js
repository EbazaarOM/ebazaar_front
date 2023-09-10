import { SVG } from '@/components/Base/SVG';

import PropTypes from 'prop-types';
import { CallAnswerIcon } from '@/components/Vectors/CallAnswerIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { keyEventHandler } from '@/utils/keyEventHandler';
import { useTranslations } from '@/next-intl/useTranslations';

const FixedPhone = ({ phone }) => {
  const [opened, setOpened] = React.useState(null);

  const toggle = () => setOpened(!opened);

  const t = useTranslations();

  return (
    <div className="fixed-phone" id="fixed-phone">
      <div
        role="button"
        tabIndex="0"
        onKeyPress={keyEventHandler(toggle)}
        className="fixed-phone__logo"
        onClick={toggle}
        aria-label="Phone"
      >
        <SVG src={CallAnswerIcon} />
      </div>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed-phone__tooltip"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="fixed-phone__tooltip__title">{t('fixedPhoneText')}</div>
            <a href={`tel:${phone}`} className="fixed-phone__tooltip__phone">
              <SVG src={CallAnswerIcon} />
              <span>{phone}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

FixedPhone.propTypes = {
  phone: PropTypes.string
};

FixedPhone.defaultProps = {
  phone: ''
};

export default FixedPhone;

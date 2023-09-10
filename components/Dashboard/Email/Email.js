import { Button } from '@/components/Base/Button';
import { Popup } from '@/components/Base/Popup';
import { SVG } from '@/components/Base/SVG';
import clsx from 'clsx';
import { MailIcon } from '@/components/Vectors/MailIcon';
import PropTypes from 'prop-types';
import { useTranslations } from '@/next-intl/useTranslations';
import { AddEmailPopup } from '../AddEmailPopup';

const Email = ({ email, identifier, onEmailAdd }) => {
  const addEmailRef = React.useRef(null);

  const addHandler = (value) => {
    addEmailRef.current.close();
    onEmailAdd(value);
  };

  const t = useTranslations();

  return (
    <div>
      <Button
        size="custom"
        className={clsx(
          email
            ? 'bg-grey-50 text-grey-600 pointer-events-none'
            : 'bg-green hover:bg-green-100 text-white hover:text-green duration-150',
          'w-full md:h-7-0 h-9-0 md:text-2-0 text-2-8'
        )}
        onClick={() => !email && addEmailRef.current.open()}
      >
        <SVG src={MailIcon} className="w-2-0 mr-1-8" />
        <span>{email ? t('email') : t('addEmail')}</span>
      </Button>
      {email && (
        <div className="md:mt-6-0 mt-4-0 font-rm md:text-1-6 text-2-6 px-3-0 py-2-2 border border-grey-200">
          {email}
        </div>
      )}
      <Popup ref={addEmailRef} className="w-76-5 h-90-percent">
        <AddEmailPopup identifier={identifier} onClose={() => addEmailRef.current.close()} onAdd={addHandler} />
      </Popup>
    </div>
  );
};

Email.propTypes = {
  email: PropTypes.string,
  identifier: PropTypes.string.isRequired,
  onEmailAdd: PropTypes.func
};

Email.defaultProps = {
  email: '',
  onEmailAdd: () => {}
};

export default Email;

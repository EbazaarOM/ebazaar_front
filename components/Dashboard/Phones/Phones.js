import { Button } from '@/components/Base/Button';
import { Checkbox } from '@/components/Dashboard/Checkbox';
import { AddPhonePopup } from '@/components/Dashboard/AddPhonePopup';
import { Popup } from '@/components/Base/Popup';
import { SVG } from '@/components/Base/SVG';
import { CallAnswerIcon } from '@/components/Vectors/CallAnswerIcon';
import PropTypes from 'prop-types';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import { deletePhone, selectMainPhone } from '@/api/user/phones';

const Phones = ({ identifier, errored, fetchPhones, phones }) => {
  const addPhonePopupRef = React.useRef(null);

  const addHandler = async () => {
    fetchPhones();
    addPhonePopupRef.current.close();
  };

  const mainSelectHandler = async (id) => {
    await selectMainPhone(id);
    fetchPhones();
  };
  const deleteHandler = async (id) => {
    await deletePhone(id);
    fetchPhones();
  };

  const t = useTranslations(['dashboard']);

  return (
    <div>
      <Button
        size="custom"
        className={clsx(
          [errored ? 'bg-red hover:text-red hover:bg-red-secondary' : 'bg-green hover:text-green hover:bg-green-100'],
          'text-white duration-150 w-full md:h-7-0 h-9-0 md:text-2-0 text-2-8'
        )}
        onClick={() => addPhonePopupRef.current.open()}
      >
        <SVG src={CallAnswerIcon} className="w-1-8 mr-1-6" />
        {t('addPhoneNumber')}
      </Button>
      <div className="h-6-0 flex items-center font-rm md:text-2-0 text-2-8 text-grey-600">
        {phones?.length > 1 && t('selectMainPhone')}
      </div>
      {phones?.map((x) => (
        <Checkbox
          key={x.id}
          title={x.number}
          checked={x.selected}
          onChange={() => mainSelectHandler(x.id)}
          onDelete={x.selected ? null : () => deleteHandler(x.id)}
          className="mb-1-8 last:mb-0"
        />
      ))}
      <Popup ref={addPhonePopupRef} className="md:w-76-5 md:h-auto w-full h-full">
        <AddPhonePopup identifier={identifier} onClose={() => addPhonePopupRef.current.close()} onAdd={addHandler} />
      </Popup>
    </div>
  );
};

Phones.propTypes = {
  identifier: PropTypes.string.isRequired,
  errored: PropTypes.bool,
  fetchPhones: PropTypes.func,
  phones: PropTypes.array
};

Phones.defaultProps = {
  errored: false,
  fetchPhones: () => {},
  phones: []
};

export default Phones;

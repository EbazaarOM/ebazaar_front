import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button } from '@/components/Base/Button';
import { Checkbox } from '@/components/Dashboard/Checkbox';
import { AddAddressPopup } from '@/components/Dashboard/AddAddressPopup';
import { Popup } from '@/components/Base/Popup';
import { SVG } from '@/components/Base/SVG';
import { useTranslations } from '@/next-intl/useTranslations';
import { addAddress, deleteAddress, selectMainAddress } from '@/api/user/addresses';
import { LocationPinIcon } from '@/components/Vectors/LocationPinIcon';

const Addresses = ({ errored, addresses, fetchAddresses }) => {
  const addAddressRef = React.useRef(null);

  React.useEffect(() => {
    fetchAddresses();
  }, []);

  const addHandler = async (info) => {
    try {
      await addAddress(info);
      fetchAddresses();
    } catch (error) {
      console.log(error);
    }
    addAddressRef.current.close();
  };

  const mainSelectHandler = async (id) => {
    await selectMainAddress(id);
    fetchAddresses();
  };
  const deleteHandler = async (id) => {
    await deleteAddress(id);
    fetchAddresses();
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
        onClick={() => addAddressRef.current.open()}
      >
        <SVG src={LocationPinIcon} className="w-2-2 mr-1-6" />
        {t('addAddress')}
      </Button>
      <div className="h-6-0 flex items-center font-rm md:text-2-0 text-2-8 text-grey-600">
        {addresses?.length > 1 && t('selectMainAddress')}
      </div>
      {addresses?.map((x) => (
        <Checkbox
          key={x.id}
          title={x.address}
          checked={x.selected}
          onChange={() => mainSelectHandler(x.id)}
          onDelete={x.selected ? null : () => deleteHandler(x.id)}
          className="md:mb-1-8 mb-4-0 last:mb-0"
        />
      ))}
      <Popup ref={addAddressRef} className="md:w-76-5 md:h-auto w-full h-full">
        <AddAddressPopup onClose={() => addAddressRef.current.close()} onAdd={addHandler} />
      </Popup>
    </div>
  );
};

Addresses.propTypes = {
  errored: PropTypes.bool,
  fetchAddresses: PropTypes.func,
  addresses: PropTypes.array
};

Addresses.defaultProps = {
  errored: false,
  fetchAddresses: () => {},
  addresses: []
};

export default Addresses;

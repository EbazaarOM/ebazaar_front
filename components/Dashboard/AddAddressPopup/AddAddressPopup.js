import PropTypes from 'prop-types';
import { useRegions } from '@/api/shared/swr';
import { Button } from '@/components/Base/Button';
import { DropDown } from '@/components/Base/DropDown';
import { SVG } from '@/components/Base/SVG';
import { TextField } from '@/components/Base/TextField';
import { Checkmark } from '@/components/Vectors/Checkmark';
import { XIcon } from '@/components/Vectors/XIcon';
import { useTranslations } from '@/next-intl/useTranslations';

const AddAddressPopup = ({ onClose, onAdd }) => {
  const [info, setInfo] = React.useState({});

  const { items: regions } = useRegions({ take: -1, hasDelivery: true });

  React.useEffect(() => {
    if (regions && regions.length > 0) {
      const tbilisi = regions.find((x) => x.isTbilisi);
      if (tbilisi) {
        setInfo({ ...info, regionId: tbilisi.id });
      }
    }
  }, [regions]);

  const t = useTranslations();

  const addHandler = () => {
    onAdd(info);
  };

  const inputChangeHandler = (key, val) => {
    setInfo({ ...info, [key]: val });
  };

  const selectedRegion = React.useMemo(
    () => (info.regionId ? regions.find((x) => x.id === +info.regionId) : {}),
    [info.regionId, regions]
  );

  return (
    <div className="px-5-0 md:py-5-0 py-11-0 bg-white w-full md:max-h-full md:h-auto h-full overflow-auto custom-scrollbar flex flex-col">
      <SVG
        src={XIcon}
        className="absolute top-5-0 right-5-0 md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-150"
        onClick={onClose}
      />
      <div className="md:text-2-0 text-2-8 font-md md:mt-0 mt-4-0">{t('addAddress')}</div>
      <DropDown
        withInput={false}
        className="mt-3-5"
        size="big"
        items={regions}
        displayKey="title"
        label={t('city')}
        placeholder={t('select')}
        onSelect={(x) => inputChangeHandler('regionId', x ? x.id : '')}
        value={selectedRegion?.title || ''}
      />
      <TextField
        className="mt-3-1"
        label={t('address')}
        placeholder={t('write')}
        value={info.address || ''}
        onChange={(value) => inputChangeHandler('address', value)}
      />
      <Button
        size="xxl"
        className="md:mt-13-0 mt-auto bg-blue hover:bg-white text-white border border-blue hover:text-blue md:w-auto w-full md:ml-auto duration-150"
        onClick={addHandler}
        disabled={!(info.address && info.regionId)}
      >
        <SVG src={Checkmark} className="md:w-1-3 w-3-0 md:mr-1-3 mr-2-0" />
        {t('add')}
      </Button>
    </div>
  );
};

AddAddressPopup.propTypes = {
  onClose: PropTypes.func,
  onAdd: PropTypes.func
};

AddAddressPopup.defaultProps = {
  onClose: () => {},
  onAdd: () => {}
};

export default AddAddressPopup;

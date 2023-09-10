import { RegisterFarmerPopup } from '@/components/Auth/RegisterFarmerPopup';
import { CircleIcon } from '@/components/Base/CircleIcon';
import { Popup } from '@/components/Base/Popup';
import { SVG } from '@/components/Base/SVG';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { useTranslations } from 'use-intl';

const RegisterFarmer = () => {
  const popupRef = React.useRef(null);
  const t = useTranslations('common');
  return (
    <>
      <div
        className="flex items-center cursor-pointer group"
        onClick={() => popupRef.current.open()}
        aria-hidden="true"
      >
        <CircleIcon className="bg-white md:w-5-0 md:h-5-0 w-9-0 h-9-0 md:mr-1-6 group-hover:bg-blue group-hover:text-white duration-150">
          <SVG src={FarmerIcon} className="md:w-2-0 w-3-6 transform translate-x-0-2" />
        </CircleIcon>
        <span className="font-rm text-2-0 group-hover:text-blue duration-150 md:inline hidden">
          {t('registerFarmer')}
        </span>
      </div>
      <Popup ref={popupRef} className="md:w-76-5 md:h-90-percent w-full h-full">
        <RegisterFarmerPopup onClose={() => popupRef.current.close()} />
      </Popup>
    </>
  );
};

export default RegisterFarmer;

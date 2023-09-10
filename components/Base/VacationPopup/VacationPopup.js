import { useTranslations } from 'next-intl';
import { XIcon } from '@/components/Vectors/XIcon';
import { Popup } from '../Popup';
import { SVG } from '../SVG';

const VacationPopup = () => {
  const popupRef = React.useRef(null);

  const t = useTranslations('vacation');

  React.useEffect(() => {
    popupRef.current.open();
  }, []);
  return (
    <Popup ref={popupRef} className="md:w-76-5 w-90-percent">
      <div className="w-full bg-white px-4-5 pt-5-0 pb-8-0 text-center">
        <SVG
          src={XIcon}
          className="md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-200 ml-auto"
          onClick={() => popupRef.current.close()}
        />

        <div className="font-bd upper md:text-2-0 text-3-0">{t('title')}</div>
        <div className="mt-4-0 md:text-1-8 text-2-8 font-lt">
          {t('descr1')}
          <br />
          {t('descr2')}
          <span className="md:text-2-6 text-3-6 text-red">&#10084;</span>
        </div>
      </div>
    </Popup>
  );
};

export default VacationPopup;

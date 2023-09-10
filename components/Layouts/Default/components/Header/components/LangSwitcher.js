// import { RouterLink } from '@/components/Base/RouterLink';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { GeorgiaFlagIcon } from '@/components/Vectors/GeorgiaFlagIcon';
import { UKFlagIcon } from '@/components/Vectors/UKFlagIcon';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropType from 'prop-types';
import { useSelector } from 'react-redux';

const items = {
  ka: { title: 'GEO', flag: GeorgiaFlagIcon },
  en: { title: 'ENG', flag: UKFlagIcon }
};

const LangSwitcher = ({ className }) => {
  const router = useRouter();
  const nextLang = router.locale === 'en' ? 'ka' : 'en';

  const { nextLanguageRoute } = useSelector((state) => state.base);

  const handleLanguageChange = () => {
    const nextLangUrlPrefix = nextLang === 'ka' ? '' : nextLang;
    const nextLangFullUrlPrefix = nextLangUrlPrefix ? `/${nextLangUrlPrefix}` : nextLangUrlPrefix;

    window.location.href = window.location.origin + nextLangFullUrlPrefix + (nextLanguageRoute || router.asPath);
  };

  return (
    <button
      type="button"
      onClick={handleLanguageChange}
      className={clsx(className, 'flex items-center font-rm md:text-1-4 text-2-2 group')}
    >
      <SVG src={items[router.locale].flag} className="w-2-8 mr-0-8" original />
      <span>{items[router.locale].title}</span>
      <SVG
        src={ArrowDownIcon}
        className="w-0-9 ml-0-7 transform -rotate-90 group-hover:translate-x-0-3 duration-150 md:block hidden"
      />
    </button>
  );
};

LangSwitcher.propTypes = {
  className: PropType.string
};
LangSwitcher.defaultProps = {
  className: ''
};

export default LangSwitcher;

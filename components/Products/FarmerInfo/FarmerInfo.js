import { generateFullAddress } from '@/utils/generateFullAddress';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Button } from '@/components/Base/Button';
import { useTranslations } from '@/next-intl/useTranslations';

const FarmerInfo = ({ className, info, allOfferClickHandler }) => {
  const fullName = info.commercialName || `${info.firstName} ${info.lastName}`;

  const fullAddress = generateFullAddress(info.address);

  const t = useTranslations();

  return (
    <div className={clsx(className, 'bg-white py-3-0 px-3-6 flex h-mc')}>
      <div className="md:w-30-percent w-40-percent mr-3-5">
        <Image
          src={process.env.STATIC_RESOURCES_URL.concat(info.profileImage)}
          alt={fullName}
          width={196}
          height={246}
          loading="eager"
          objectFit="cover"
          layout="responsive"
        />
      </div>
      <div className="flex-1">
        <p className="md:text-2-4 text-3-0 font-md upper">{fullName}</p>
        <p className="mt-1-1 md:text-2-0 text-2-8 font-rm">{fullAddress}</p>
        <Button
          size="sm"
          className={clsx('bg-blue border border-blue hover:bg-white text-white hover:text-black mt-3-0 duration-150')}
          onClick={allOfferClickHandler}
          px="md:px-3-0 px-2-5"
        >
          {t('allOffer')}
        </Button>
      </div>
    </div>
  );
};

FarmerInfo.propTypes = {
  className: PropTypes.string,
  info: PropTypes.object,
  allOfferClickHandler: PropTypes.func
};

FarmerInfo.defaultProps = {
  className: '',
  info: {},
  allOfferClickHandler: () => {}
};

export default FarmerInfo;

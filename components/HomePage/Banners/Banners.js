/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/Base/Button';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';

const Banners = ({ className, content }) => {
  const t = useTranslations();
  return (
    <div className={clsx(className, 'grid md:grid-cols-5 grid-cols-1 md:gap-3-0 gap-4-5')}>
      <a
        href={content.link1}
        target="_blank"
        rel="noreferrer"
        className="h-full relative md:col-span-2 order-online-section group"
        onClick={() => dataLayer.push({ event: 'gtm.click', name: content.title1 })}
      >
        <div className="h-full w-full md:block hidden relative">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(content.image1)}
            alt={content.title1}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="h-full w-full md:hidden block relative">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(content.image1Mobile)}
            alt={content.title1}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="absolute inset-0 px-5-0 py-3-5 flex flex-col h-full justify-end z-1 pointer-events-none">
          <div className="font-bd md:text-3-8 text-3-4 upper line-clamp-3">{content.title1}</div>
          <div className="font-lt md:text-2-0 text-2-6 mt-1-1 line-clamp-5">{content.shortDescription1}</div>
          <Button className="bg-white mt-3-5 group-hover:bg-green group-hover:text-white duration-150 w-mc">
            {t('seeFull')}
          </Button>
        </div>
        <div className="absolute inset-0 bg-white pointer-events-none group-hover:opacity-40 opacity-0 duration-150" />
      </a>
      <a
        href={content.link2}
        target="_blank"
        rel="noreferrer"
        className="h-full relative md:col-span-3 order-online-section group"
        onClick={() => dataLayer.push({ event: 'gtm.click', name: content.title2 })}
      >
        <div className="h-full w-full block relative">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(content.image2)}
            alt={content.title2}
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="absolute inset-0 px-5-0 py-3-5 flex flex-col h-full justify-end z-1 pointer-events-none">
          <div className="font-bd md:text-3-8 text-3-4 upper line-clamp-3">{content.title2}</div>
          <div className="font-lt md:text-2-0 text-2-6 mt-1-1 line-clamp-5">{content.shortDescription2}</div>
          <Button className="bg-white mt-3-5 group-hover:bg-green group-hover:text-white duration-150 w-mc">
            {t('seeFull')}
          </Button>
        </div>
        <div className="absolute inset-0 bg-white pointer-events-none group-hover:opacity-40 opacity-0 duration-150" />
      </a>
      <style jsx>{`
        .order-online-section {
          height: 72rem;
        }
        @media only screen and (max-width: 768px) {
          .order-online-section {
            height: 55rem;
          }
        }
      `}</style>
    </div>
  );
};

Banners.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object
};

Banners.defaultProps = {
  className: '',
  content: {}
};

export default Banners;

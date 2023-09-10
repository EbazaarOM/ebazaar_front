/* eslint-disable @next/next/no-img-element */
import { useCategoriesTree } from '@/api/products/swr';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { LeftLeafIcon } from '@/components/Vectors/LeftLeafIcon';
import { RightLeafIcon } from '@/components/Vectors/RightLeafIcon';
import { XIcon } from '@/components/Vectors/XIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';
import { IconButton } from '../IconButton';
import { RouterLink } from '../RouterLink';
import { SVG } from '../SVG';

const CategoriesNavigation = ({ className, onCloseClick }) => {
  const t = useTranslations('common');

  const { data: categories } = useCategoriesTree();

  return (
    <div className={clsx(className, 'bg-white md:mt-0-1 p-5-3 pl-7-0 md:p-0')}>
      <div className="md:h-10-0 md:border-b border-grey-200 md:pr-10-0 md:pl-8-3 md:flex items-center justify-between">
        <div className="font-md md:text-2-0 text-3-0 upper md:mt-0 mt-6-0">
          <RouterLink href="/products/all" className="flex items-center group">
            {t('categories')}
            <SVG
              src={ArrowDownIcon}
              className="md:w-1-1 w-2-0 md:ml-1-2 ml-2-0 transform -rotate-90 group-hover:translate-x-1-0 duration-150"
            />
          </RouterLink>
        </div>
        <IconButton aria-label="Close" onClick={onCloseClick} className="md:block hidden">
          <SVG src={XIcon} className="md:w-2-0 w-3-4 hover:rotate-90 transform duration-200 cursor-pointer " />
        </IconButton>
      </div>
      <div className="md:pr-10-0 md:pl-8-3 md:font-rm font-md md:text-2-0 text-3-0 md:pt-3-0 md:pb-4-0 md:mt-0 mt-6-0 flex relative cont">
        <div className="flex-1 md:pr-10-0 pr-5-0 relative z-1">
          <ul className="grid md:grid-cols-2 md:gap-y-2-2 gap-y-6-0 gap-x-4-2">
            {categories &&
              categories.map((x) => (
                <li key={x.id}>
                  <RouterLink
                    className="hover:text-green duration-150"
                    href={{
                      pathname: '/products/all',
                      query: { categoryId: x.id }
                    }}
                  >
                    {x.title}
                  </RouterLink>
                </li>
              ))}
          </ul>
        </div>
        {/* <div className="w-30-percent md:block hidden">
          <img src="/images/categories-banner.jpg" alt="" />
        </div> */}
        <div className="absolute right-0 bottom-0 md:flex hidden items-end text-body-bg pr-10-0">
          <SVG src={LeftLeafIcon} className="w-22-0 mr-3-6" />
          <SVG src={RightLeafIcon} className="w-30-1" />
        </div>
        <style jsx>{`
          @media (min-width: 769px) {
            .cont {
              min-height: 30rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

CategoriesNavigation.propTypes = {
  className: PropTypes.string,
  onCloseClick: PropTypes.func
};

CategoriesNavigation.defaultProps = {
  className: '',
  onCloseClick: () => {}
};

export default CategoriesNavigation;

import { useFarmers } from '@/api/farmer/swr';
import { useSpecifications, useStickers } from '@/api/products/swr';
import { useMunicipalities, useRegions, useVillages } from '@/api/shared/swr';
import { Button } from '@/components/Base/Button';
import { CategoriesFilter } from '@/components/Base/CategoriesFilter';
import { DropDown } from '@/components/Base/DropDown';
import { PriceRange } from '@/components/Base/PriceRange';
import { StickersSelector } from '@/components/Base/StickersSelector';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { Checkmark } from '@/components/Vectors/Checkmark';
import { FilterIcon } from '@/components/Vectors/FilterIcon';
import { XIcon } from '@/components/Vectors/XIcon';
import useDisableScroll from '@/hooks/useDisableScroll';
import { useTranslations } from '@/next-intl/useTranslations';
import { queryIdArraysToArray } from '@/utils/queryIdArraysToArray';
import { hideSiteActions, showSiteActions } from '@/utils/siteActionsUtils';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Specifications } from '../Specifications';

const MIN_PRICE = 1;
const MAX_PRICE = 500;

const Filter = ({
  selectedSubCategoryId,
  selectedCategoryId,
  categories,
  path,
  categoryClickHandler,
  allCategoryClickHandler,
  filterOptions,
  addFilter,
  hasSaleFilter,
  isFarmerPage,
  additionalQuery
}) => {
  const [categoriesIsVisible, setCategoriesVisibility] = React.useState(false);
  const [filterIsVisible, setFilterVisibility] = React.useState(false);
  const baseQuery = {
    ...additionalQuery,
    subCategoryId: selectedSubCategoryId || '',
    categoryId: selectedCategoryId || ''
  };

  React.useEffect(() => {
    if (categoriesIsVisible || filterIsVisible) {
      hideSiteActions();
    } else {
      showSiteActions();
    }
  }, [categoriesIsVisible, filterIsVisible]);

  const t = useTranslations();

  const router = useRouter();
  React.useEffect(() => {
    if (categoriesIsVisible) setCategoriesVisibility(false);
  }, [router]);

  useDisableScroll({ condition: filterIsVisible || categoriesIsVisible });

  const { data: specifications } = useSpecifications(selectedSubCategoryId);
  const { items: stickers } = useStickers({ take: -1 });
  const { items: regions } = useRegions({ take: -1, ...baseQuery });
  const { items: farmers } = useFarmers({ take: -1, ...baseQuery });

  const mappedFarmers = React.useMemo(
    () =>
      farmers
        ? farmers.map((x) => ({
            id: x.id,
            fullName: x.commercialName ? x.commercialName : `${x.firstName} ${x.lastName}`
          }))
        : [],
    [farmers]
  );
  const { items: municipalities } = useMunicipalities(
    { take: -1, regionId: filterOptions.regionId, ...baseQuery },
    !!filterOptions.regionId
  );

  const { items: villages } = useVillages(
    { take: -1, regionId: filterOptions.regionId, municipalityId: filterOptions.municipalityId, ...baseQuery },
    !!filterOptions.municipalityId
  );

  const selectedRegion = React.useMemo(
    () => (filterOptions.regionId ? regions.find((x) => x.id === +filterOptions.regionId) : undefined),
    [filterOptions.regionId, regions]
  );

  const selectedMunicipality = React.useMemo(
    () =>
      filterOptions.municipalityId ? municipalities.find((x) => x.id === +filterOptions.municipalityId) : undefined,
    [filterOptions.municipalityId, municipalities]
  );

  const selectedVillage = React.useMemo(
    () => (filterOptions.villageId ? villages.find((x) => x.id === +filterOptions.villageId) : undefined),
    [filterOptions.villageId, villages]
  );

  const selectedFarmer = React.useMemo(
    () => (filterOptions.farmer_id ? mappedFarmers.find((x) => x.id === filterOptions.farmer_id) : undefined),
    [filterOptions.farmer_id, farmers]
  );

  const selectedStickerIds = React.useMemo(
    () => queryIdArraysToArray(filterOptions.stickerIds),
    [filterOptions.stickerIds, stickers]
  );

  const selectedSpecIds = React.useMemo(
    () => queryIdArraysToArray(filterOptions.specIds),
    [filterOptions.specIds, specifications]
  );

  const priceRangeChangeHandler = (newRange) => {
    const { min: costFrom, max: costTo } = newRange;
    addFilter({ costFrom, costTo });
  };

  const priceRange = React.useMemo(
    () => ({ min: +filterOptions.costFrom || MIN_PRICE, max: +filterOptions.costTo || MAX_PRICE }),
    [filterOptions.costFrom, filterOptions.costTo]
  );

  const withSale = filterOptions.withSale === 'true';

  return (
    <>
      <div
        className={clsx('bg-white md:static fixed inset-0 z-100 duration-500 transform overflow-auto', [
          categoriesIsVisible ? 'translate-y-0' : 'translate-y-100-percent md:translate-y-0'
        ])}
      >
        <SVG
          src={XIcon}
          className="w-3-4 md:hidden absolute top-6-3 right-5-0"
          onClick={() => setCategoriesVisibility(false)}
        />
        <CategoriesFilter
          selectedPath={path.map((x) => x.id)}
          className="md:border-b border-grey-200"
          categories={categories}
          onCategoryClick={categoryClickHandler}
          allCategoryClickHandler={allCategoryClickHandler}
        />
      </div>
      <div
        className={clsx(
          'md:px-3-0 px-5-0 md:pt-2-0 pt-5-0 pb-8-0 bg-white md:static fixed inset-0 z-100 duration-500 transform overflow-auto',
          [filterIsVisible ? 'translate-y-0' : 'translate-y-100-percent md:translate-y-0']
        )}
      >
        <div className="flex items-center justify-between">
          <div className="font-rm md:text-1-8 text-2-8 flex items-center">
            <span>{t('filter')}</span>
            <SVG src={FilterIcon} className="md:ml-1-0 ml-2-0 md:w-1-6 w-2-8" />
          </div>
          <SVG src={XIcon} className="w-3-4 md:hidden" onClick={() => setFilterVisibility(false)} />
        </div>
        <Specifications
          specifications={specifications}
          selectedSpecs={selectedSpecIds}
          className="md:mt-3-0 mt-7-9"
          onSelect={(ids) => addFilter({ specIds: ids })}
        />
        {!isFarmerPage && (
          <>
            <div className="font-md md:text-1-8 text-3-0 md:mt-2-0 mt-5-0">{t('selectLocation')}</div>
            <DropDown
              className="md:mt-2-5 mt-4-0"
              items={regions}
              displayKey="title"
              placeholder={t('region')}
              onSelect={(x) => addFilter({ regionId: x ? x.id : '', municipalityId: '' })}
              value={selectedRegion?.title || ''}
              withClearIcon
            />
            <DropDown
              className="md:mt-2-5 mt-4-0"
              items={municipalities}
              displayKey="title"
              placeholder={t('municipality')}
              onSelect={(x) => addFilter({ municipalityId: x ? x.id : '' })}
              value={selectedMunicipality?.title || ''}
              withClearIcon
              disabled={!selectedRegion}
            />
            <DropDown
              className="md:mt-2-5 mt-4-0"
              items={villages}
              displayKey="title"
              placeholder={t('village')}
              onSelect={(x) => addFilter({ villageId: x ? x.id : '' })}
              value={selectedVillage?.title || ''}
              withClearIcon
              disabled={!selectedMunicipality}
            />
            <div className="font-md md:text-1-8 text-3-0 md:mt-3-0 mt-5-0">{t('selectFarmer')}</div>
            <DropDown
              className="md:mt-2-5 mt-4-0"
              items={mappedFarmers}
              displayKey="fullName"
              placeholder={t('farmer')}
              onSelect={(x) => addFilter({ farmer_id: x ? x.id : '' })}
              value={selectedFarmer?.fullName || ''}
              withClearIcon
            />
          </>
        )}
        <PriceRange
          label={t('filterByPrice')}
          className="md:mt-3-0 mt-6-0 max-w-full"
          min={MIN_PRICE}
          max={MAX_PRICE}
          onChange={priceRangeChangeHandler}
          priceRange={priceRange}
          key={JSON.stringify(priceRange)}
        />
        {hasSaleFilter && (
          <Button
            size="custom"
            font="lt"
            className={clsx(
              { 'bg-grey-200': withSale },
              'rounded-40-0 w-full border border-grey-200 md:mt-5-5 mt-8-0 md:h-5-4 h-9-0 md:text-1-6 text-2-6'
            )}
            onClick={() => addFilter({ withSale: !withSale })}
          >
            <SVG src={Checkmark} className="md:w-1-8 w-3-0 md:mr-1-0 mr-3-0 text-grey" />
            <span>{t('saledProducts')}</span>
          </Button>
        )}
        <div className="font-md md:text-1-8 text-3-0 md:mt-5-4 mt-6-0">{t('filterBySticker')}</div>
        <div className="grid grid-cols-4 gap-2-0 md:mt-3-0 mt-8-0">
          <StickersSelector
            stickers={stickers}
            onSelect={(ids) => addFilter({ stickerIds: ids })}
            selectedStickerIds={selectedStickerIds}
          />
        </div>
        <div className="sticky top-85-percent mt-4-0 md:hidden">
          <Button size="xxl" className="bg-blue text-white w-full" onClick={() => setFilterVisibility(false)}>
            <span>{t('search')}</span>
          </Button>
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <div
          className="border-grey-200 border h-8-0 px-3-0 text-2-6 font-rm flex items-center justify-between w-36-3 text-grey-300"
          onClick={() => setCategoriesVisibility(!categoriesIsVisible)}
          role="button"
          aria-hidden
        >
          <span>{t('categories')}</span>
          <SVG src={ArrowDownIcon} className="w-2-2 ml-1-0 text-grey-500" />
        </div>

        <Button
          size="custom"
          font="lt"
          className="bg-blue text-white h-8-0 flex-1 ml-2-5"
          onClick={() => setFilterVisibility(!filterIsVisible)}
        >
          <span className="text-3-0 font-rm">{t('filter')}</span>
          <SVG src={FilterIcon} className="ml-2-0 w-2-8" />
        </Button>
      </div>
    </>
  );
};

Filter.propTypes = {
  selectedSubCategoryId: PropTypes.number,
  selectedCategoryId: PropTypes.number,
  categories: PropTypes.array,
  path: PropTypes.array,
  categoryClickHandler: PropTypes.func,
  allCategoryClickHandler: PropTypes.func,
  filterOptions: PropTypes.object,
  addFilter: PropTypes.func,
  hasSaleFilter: PropTypes.bool,
  isFarmerPage: PropTypes.bool,
  additionalQuery: PropTypes.object
};

Filter.defaultProps = {
  selectedSubCategoryId: null,
  selectedCategoryId: null,
  categories: [],
  path: [],
  categoryClickHandler: () => {},
  allCategoryClickHandler: () => {},
  filterOptions: {},
  addFilter: () => {},
  hasSaleFilter: true,
  isFarmerPage: false,
  additionalQuery: {}
};

export default Filter;

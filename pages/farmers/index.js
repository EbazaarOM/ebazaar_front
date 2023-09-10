import { PageLayout } from '@/components/Layouts/PageLayout';
import PropTypes from 'prop-types';
import { getFarmers } from '@/api/farmer';
import { SingleFarmer } from '@/components/Base/SingleFarmer';
import { Pagination } from '@/components/Base/Pagination';
import { useRouter } from 'next/router';
import { useMunicipalities, useRegions, useVillages } from '@/api/shared/swr';
import { DropDown } from '@/components/Base/DropDown';
import { useCategories, useStickers } from '@/api/products/swr';
import { StickersSelector } from '@/components/Base/StickersSelector';
import { StickersDropDown } from '@/components/Farmer/StickersDropDown';
import { SVG } from '@/components/Base/SVG';
import { FilterIcon } from '@/components/Vectors/FilterIcon';
import { Button } from '@/components/Base/Button';
import { XIcon } from '@/components/Vectors/XIcon';
import clsx from 'clsx';
import useDisableScroll from '@/hooks/useDisableScroll';
import { useTranslations } from '@/next-intl/useTranslations';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const PER_PAGE = 12;

const Farmers = ({ items, total }) => {
  const t = useTranslations();
  useBreadcrumbDispatcher([{ href: '/farmers', title: t('farmers') }]);
  const [filterIsVisible, setFilterVisibility] = React.useState(false);

  useDisableScroll({ condition: filterIsVisible });

  const router = useRouter();

  const addFilter = (query) => router.push({ query: { ...router.query, ...query, page: 1 } });

  const { items: categories } = useCategories({ take: -1 });
  const { items: stickers } = useStickers({ take: -1 });
  const { items: regions } = useRegions({ take: -1 });
  const { items: municipalities } = useMunicipalities(
    { take: -1, regionId: router.query.regionId },
    !!router.query.regionId
  );
  const { items: villages } = useVillages(
    { take: -1, regionId: router.query.regionId || '', municipalityId: router.query.municipalityId || '' },
    !!router.query.regionId
  );

  const selectedCategory = React.useMemo(
    () => (router.query.categoryId ? categories.find((x) => x.id === +router.query.categoryId) : undefined),
    [router.query.categoryId, categories]
  );

  const selectedRegion = React.useMemo(
    () => (router.query.regionId ? regions.find((x) => x.id === +router.query.regionId) : undefined),
    [router.query.regionId, regions]
  );

  const selectedMunicipality = React.useMemo(
    () => (router.query.municipalityId ? municipalities.find((x) => x.id === +router.query.municipalityId) : undefined),
    [router.query.municipalityId, municipalities]
  );

  const selectedVillage = React.useMemo(
    () => (router.query.villageId ? villages.find((x) => x.id === +router.query.villageId) : undefined),
    [router.query.villageId, villages]
  );

  const selectedStickerIds = React.useMemo(
    () =>
      // eslint-disable-next-line no-nested-ternary
      router.query.stickerIds
        ? router.query.stickerIds instanceof Array
          ? router.query.stickerIds.map((id) => +id)
          : [+router.query.stickerIds]
        : [],
    [router.query.stickerIds]
  );

  const stickerSelectHandler = (ids) => addFilter({ stickerIds: ids });

  return (
    <>
      <HeaderTagsRenderer title={t('farmers')} />
      <div className="md:hidden flex items-center flex-1">
        <div style={{ width: '40rem' }}>
          <DropDown
            items={categories}
            displayKey="title"
            placeholder={t('category')}
            onSelect={(x) => addFilter({ categoryId: x ? x.id : '' })}
            value={selectedCategory?.title || ''}
            withClearIcon
          />
        </div>
        <Button
          size="custom"
          font="lt"
          className="bg-blue text-white h-8-0 ml-2-5 flex-1"
          onClick={() => setFilterVisibility(true)}
        >
          <span className="text-3-0 font-rm">{t('filter')}</span>
          <SVG src={FilterIcon} className="ml-2-0 w-2-8" />
        </Button>
      </div>
      <div
        className={clsx(
          [filterIsVisible ? 'translate-y-0' : 'translate-y-100-percent'],
          'bg-white md:static fixed inset-0 z-100 md:transform-none transform duration-500'
        )}
      >
        <div className="md:py-2-5 md:px-4-0 p-5-0 pb-22-0 md:overflow-visible overflow-auto md:w-auto md:h-auto w-full h-full">
          <div className="md:hidden flex items-center justify-between">
            <div className="font-rm md:text-1-8 text-2-8 flex items-center">
              <span>{t('filter')}</span>
              <SVG src={FilterIcon} className="md:ml-1-0 ml-2-0 md:w-1-6 w-2-8" />
            </div>
            <SVG src={XIcon} className="w-3-4 md:hidden" onClick={() => setFilterVisibility(false)} />
          </div>
          <div className="grid md:grid-cols-5 md:gap-2-0 gap-5-0 md:mt-0 mt-8-0">
            <DropDown
              className="md:block hidden"
              items={categories}
              displayKey="title"
              placeholder={t('category')}
              onSelect={(x) => addFilter({ categoryId: x ? x.id : '' })}
              value={selectedCategory?.title || ''}
              withClearIcon
            />
            <DropDown
              items={regions}
              displayKey="title"
              placeholder={t('region')}
              onSelect={(x) => addFilter({ regionId: x ? x.id : '', municipalityId: '', villageId: '' })}
              value={selectedRegion?.title || ''}
              withClearIcon
            />
            <DropDown
              items={municipalities}
              displayKey="title"
              placeholder={t('municipality')}
              onSelect={(x) => addFilter({ municipalityId: x ? x.id : '', villageId: '' })}
              value={selectedMunicipality?.title || ''}
              withClearIcon
              disabled={!selectedRegion}
            />
            <DropDown
              items={villages}
              displayKey="title"
              placeholder={t('village')}
              onSelect={(x) => addFilter({ villageId: x ? x.id : '' })}
              value={selectedVillage?.title || ''}
              withClearIcon
              disabled={!selectedRegion}
            />
            <StickersDropDown
              className="md:block hidden"
              stickers={stickers}
              displayKey="title"
              placeholder={t('stickers')}
              onSelect={stickerSelectHandler}
              selectedStickerIds={selectedStickerIds}
              withClearIcon
            />
          </div>
          <div className="font-md text-3-0 mt-7-0 md:hidden">{t('filterBySticker')}</div>
          <div className="grid grid-cols-4 gap-2-0 md:hidden mt-6-0">
            <StickersSelector
              stickers={stickers}
              onSelect={stickerSelectHandler}
              selectedStickerIds={selectedStickerIds}
            />
          </div>
        </div>
        <div className="fixed bottom-7-0 md:hidden px-5-0 w-full">
          <Button size="xxl" className="bg-blue text-white w-full" onClick={() => setFilterVisibility(false)}>
            <span>{t('search')}</span>
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-x-3-0 md:gap-y-4-0 gap-2-5 md:mt-4-0 mt-6-0">
        {items?.map((x) => (
          <SingleFarmer key={x.id} item={x} />
        ))}
      </div>
      {total > PER_PAGE && (
        <div className="mt-9-6 flex justify-end">
          <Pagination
            page={+router.query.page || 1}
            onPageChange={(nextPage) =>
              router.push({ pathname: router.pathname, query: { ...router.query, page: nextPage } })
            }
            pageCount={total / PER_PAGE}
            color="secondary"
          />
        </div>
      )}
    </>
  );
};

Farmers.propTypes = {
  items: PropTypes.instanceOf(Array),
  total: PropTypes.number
};

Farmers.defaultProps = {
  items: [],
  total: 0
};

Farmers.getInitialProps = async ({ query }) => {
  const { page = 1, ...restQuery } = query;

  const { items, total } = await getFarmers({ take: PER_PAGE, skip: (+page - 1) * PER_PAGE, ...restQuery });

  return {
    items,
    total
  };
};

Farmers.getLayout = PageLayout.getLayout({ hasShare: false });

export default Farmers;

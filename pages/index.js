import PropTypes from 'prop-types';
import { useBlogs } from '@/api/blogs/swr';
import { useTopRatedFarmers } from '@/api/farmer/swr';
import { getSlider } from '@/api/homePage';
import { useBanners, useFeatures } from '@/api/homePage/swr';
import { useProducts } from '@/api/products/swr';
import { Blogs } from '@/components/HomePage/Blogs';
import { Carousel } from '@/components/HomePage/Carousel';
import { FeaturesSection } from '@/components/HomePage/FeaturesSection';
import { Banners } from '@/components/HomePage/Banners';
import { PopularFarmers } from '@/components/HomePage/PopularFarmers';
import { ProductsSection } from '@/components/HomePage/ProductsSection';
import { useTranslations } from '@/next-intl/useTranslations';
// import { VacationPopup } from '@/components/Base/VacationPopup';

const Home = ({ slider }) => {
  const { data: bannersContent } = useBanners();
  const { items: features } = useFeatures({ take: 6 });
  const { items: blogs } = useBlogs({ take: 2 });
  const { items: seasonalProducts } = useProducts({ take: 9, hotSeasonal: true });
  const { items: premiumProducts } = useProducts({ take: 9, premium: true });
  const { items: saledProducts } = useProducts({ take: 9, withSale: true });
  const { items: popularFarmers } = useTopRatedFarmers({ take: 9 });

  const t = useTranslations(['common', 'homePage']);

  return (
    <>
      {/* VacationPopup -> remove this line if there is no vacation from ebazaar side  */}
      {/* <VacationPopup /> */}
      <Carousel elems={slider} />
      <div className="container">
        {features && features.length > 0 && <FeaturesSection className="mt-3-8" features={features} />}
        {seasonalProducts && seasonalProducts.length > 0 && (
          <ProductsSection
            variant="big"
            className="md:mt-7-0 mt-6-0"
            title={t('homePage.seasonalProducts')}
            uniqueName="seasonal-products"
            products={seasonalProducts}
            url="/products/seasonal"
          />
        )}
        {saledProducts && saledProducts.length > 0 && (
          <ProductsSection
            variant="big"
            className="md:mt-7-0 mt-6-0"
            title={t('homePage.saledProducts')}
            uniqueName="saled-products"
            products={saledProducts}
            url="/products/saled"
          />
        )}
        {bannersContent && <Banners className="mt-7-0" content={bannersContent} />}
        {premiumProducts && premiumProducts.length > 0 && (
          <ProductsSection
            variant="big"
            className="md:mt-7-0 mt-6-0"
            title={t('homePage.premiumProducts')}
            uniqueName="premium-products"
            products={premiumProducts}
            url="/products/premium"
          />
        )}
        <PopularFarmers items={popularFarmers} className="mt-7-0" />
        {blogs && blogs.length > 0 && <Blogs items={blogs} className="md:mt-7-0 mt-6-0" />}
      </div>
    </>
  );
};

Home.propTypes = {
  slider: PropTypes.instanceOf(Array)
};

Home.defaultProps = {
  slider: []
};

Home.getInitialProps = async () => {
  const { items: slider } = await getSlider({ take: 7 });

  return {
    slider
  };
};

Home.localeNamespaces = ['homePage', 'vacation'];

export default Home;

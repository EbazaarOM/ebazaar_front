import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { PageLayout } from '@/components/Layouts/PageLayout';
import { getSingleProduct } from '@/api/products/products';
import { ProductImages } from '@/components/Products/ProductImages';
import { ProductDetails } from '@/components/Products/ProductDetails';
import { Reviews } from '@/components/Base/Reviews';
import { ProductsSection } from '@/components/HomePage/ProductsSection';
import { useSimilarProducts } from '@/api/products/swr';
import { Sticker } from '@/components/Base/Sticker';
import { SaleBadge } from '@/components/Base/SaleBadge';
import { DynamicContent } from '@/components/Base/DynamicContent';
import { addWishlistItem } from '@/utils/product/wishlist';
import { ProductPreview } from '@/models/ProductPreview';
import { addCartItem } from '@/utils/product/cart';
import { signInStatus } from '@/utils/constants/signInStatus';
import { FarmerInfo } from '@/components/Products/FarmerInfo';
import { useTranslations } from '@/next-intl/useTranslations';
import { SVG } from '@/components/Base/SVG';
import { EyeIcon } from '@/components/Vectors/EyeIcon';
import { setProductPreview } from '@/store/actions/products.action';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import stripHTMLTagsFromString from '@/utils/stripHTMLTagsFromString';
import { setBreadcrumb } from '@/store/actions/base.action';
// import { VacationPopup } from '@/components/Base/VacationPopup';

const ProductByCode = ({ details }) => {
  const { subCategory = {} } = details;
  const t = useTranslations();
  const { userInfo } = useSelector((state) => state.user);

  const breadcrumb = [
    { href: '/products/all', title: t('categories') },
    { href: `/products/all?categoryId=${subCategory.categoryId}`, title: subCategory.categoryTitle },
    ...(subCategory.parentSubCategoryId
      ? [
          {
            href: `/products/all?categoryId=${subCategory.categoryId}&subCategoryId=${subCategory.parentSubCategoryId}`,
            title: subCategory.parentSubCategoryTitle
          }
        ]
      : []),
    {
      href: `/products/all?categoryId=${subCategory.categoryId}&subCategoryId=${subCategory.id}`,
      title: subCategory.title
    }
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));

    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: 'view_item',
      user_id: userInfo ? userInfo.nameid : '',
      ecommerce: {
        items: [
          {
            item_id: router.query.code,
            item_name: details.title,
            currency: 'GEL',
            discount: details.saleActive ? details.unitCost - details.saleCost : 0,
            item_category: subCategory.title,
            price: details.unitCost,
            quantity: 1
          }
        ]
      }
    });
  }, [router.query.code]);

  const { items: products } = useSimilarProducts(details.id, { take: 9 });
  const { userSignInStatus } = useSelector((state) => state.user);
  const isUserSignedIn = userSignInStatus === signInStatus.SIGNED_IN;

  const allOfferClickHandler = () => {
    router.push({ pathname: '/farmers/[id]', query: { id: details.farmerId } });
  };

  const addCartClickHandler = async (quantity) => {
    await addCartItem(isUserSignedIn, details.code, quantity);
    dispatch(setProductPreview(new ProductPreview(details, true)));

    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: 'add_to_cart',
      user_id: userInfo ? userInfo.nameid : '',
      ecommerce: {
        items: [
          {
            item_id: router.query.code,
            item_name: details.title,
            currency: 'GEL',
            discount: details.saleActive ? details.unitCost - details.saleCost : 0,
            item_category: subCategory.title,
            price: details.unitCost,
            quantity
          }
        ]
      }
    });
  };
  const addWishlistClickHandler = async () => {
    await addWishlistItem(isUserSignedIn, details.code);
    dispatch(setProductPreview(new ProductPreview(details, false)));

    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: 'add_to_wishlist',
      user_id: userInfo ? userInfo.nameid : '',
      ecommerce: {
        currency: 'GEL',
        value: details.unitCost,
        items: [
          {
            item_id: router.query.code,
            item_name: details.title,
            currency: 'GEL',
            discount: details.saleActive ? details.unitCost - details.saleCost : 0,
            item_category: subCategory.title,
            price: details.unitCost,
            quantity: 1
          }
        ]
      }
    });
  };
  const buyClickHandler = (quantity) => {
    router.push({ pathname: '/cart/checkout', query: { code: details.code, quantity } });
  };

  const [shareImage] = details.images || [];

  return (
    <>
      {/* VacationPopup -> remove this line if there is no vacation from ebazaar side  */}
      {/* <VacationPopup /> */}
      <HeaderTagsRenderer
        title={details.title}
        metaTitle={details.title}
        description={stripHTMLTagsFromString(details.description)}
        image={shareImage?.name && process.env.STATIC_RESOURCES_URL.concat(shareImage.name)}
      />
      <div className="md:hidden text-2-8 flex items-center absolute right-5-0 -mt-6-5">
        <SVG src={EyeIcon} className="w-2-8 mr-1-4" />
        {details.views}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3-0">
        <div className="relative">
          <ProductImages images={details.images} videoLink={details.videoLink} stickers={details.stickers} />
          <div className="absolute top-3-0 left-3-0 right-3-0 z-2 flex">
            <div className="flex flex-wrap flex-1">
              {details.stickers &&
                details.stickers.map((x) => (
                  <Sticker key={x.id} sticker={x} className="md:w-5-0 w-4-0 md:mr-2-0 md:mb-2-0 mr-1-2 mb-1-2" />
                ))}
            </div>
            {details.saleActive && (
              <SaleBadge className="md:-mt-4-7 -mt-3-5 pointer-events-auto ml-auto" percent={details.salePercentage} />
            )}
          </div>
        </div>
        <ProductDetails
          details={details}
          onBuyClick={buyClickHandler}
          onCartClick={addCartClickHandler}
          onWishlistClick={addWishlistClickHandler}
        />
      </div>
      {details.farmerData && (
        <FarmerInfo
          className="md:hidden mt-10-0"
          info={details.farmerData}
          allOfferClickHandler={allOfferClickHandler}
        />
      )}
      <div className="font-md md:mt-4-0 mt-5-0">
        <div className="text-3-0 upper md:pb-4-0 pb-3-0 border-b border-grey-300">{t('aboutProduct')}</div>
        <div className="mt-3-0 flex justify-between">
          <div className="flex-1 md:text-1-8 text-2-8 mr-5-0">
            <div className="">{t('description')}:</div>
            <DynamicContent className="mt-2-5" description={details.description} />
            <div className="md:mt-3-0 mt-5-0">{t('productDetails')}:</div>
            <DynamicContent className="mt-2-5" description={details.additionalDescription} />
          </div>
          {details.farmerData && (
            <FarmerInfo
              className="w-40-percent md:flex hidden"
              info={details.farmerData}
              allOfferClickHandler={allOfferClickHandler}
            />
          )}
        </div>
      </div>
      {details.reviews && details.reviews.length > 0 && (
        <Reviews className="md:mt-10-0 mt-7-0" reviews={details.reviews} />
      )}
      {products && products.length > 0 && (
        <ProductsSection
          products={products}
          className="md:mt-10-0 mt-8-0"
          title={t('seeSimilarProducts')}
          uniqueName="similarProducts"
          productsPerView={4}
        />
      )}
    </>
  );
};

ProductByCode.propTypes = {
  details: PropTypes.object
};

ProductByCode.defaultProps = {
  details: {}
};

ProductByCode.getInitialProps = async ({ query }) => {
  const { code } = query;
  const details = await getSingleProduct(encodeURIComponent(code));

  return {
    details
  };
};

ProductByCode.getLayout = PageLayout.getLayout();
ProductByCode.localeNamespaces = ['vacation'];

export default ProductByCode;

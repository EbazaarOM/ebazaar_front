import { PageLayout } from '@/components/Layouts/PageLayout';
import { useTranslations } from '@/next-intl/useTranslations';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { getOrderById } from '@/api/orders/orders';
import PropTypes from 'prop-types';
import { SingleProduct } from '@/components/Base/SingleProduct';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const OrderByIdPage = ({ order }) => {
  const t = useTranslations(['order']);
  useBreadcrumbDispatcher([{ href: `/orders/${order.id}`, title: `${t('orderNumber')} #${order.code}` }]);

  const { products } = order;

  return (
    <>
      <HeaderTagsRenderer image="/images/order-share.png" description={t('orderShareText')} />
      <div className="grid md:grid-cols-4 grid-cols-2 gap-x-3-0 gap-y-4-5">
        {products && products.map((x) => <SingleProduct product={x} key={x.id || x.code} />)}
      </div>
    </>
  );
};

OrderByIdPage.propTypes = {
  order: PropTypes.object
};

OrderByIdPage.defaultProps = {
  order: {}
};

OrderByIdPage.getInitialProps = async ({ query }) => {
  const { id } = query;
  const order = await getOrderById(id);

  order.products = order.products
    ? order.products.map((x) => ({
        id: x.id,
        image: x.image,
        code: x.code,
        title: x.productTitle,
        saleCost: x.saleCost,
        unitCost: x.unitCost,
        region: x.regionTitle,
        village: x.villageTitle,
        municipality: x.municipalityTitle
      }))
    : [];

  return {
    order
  };
};

OrderByIdPage.getLayout = PageLayout.getLayout();

OrderByIdPage.localeNamespaces = ['order'];

export default OrderByIdPage;

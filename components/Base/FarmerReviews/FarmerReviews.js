import { getFarmerReviews } from '@/api/farmer';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SingleReview } from '@/components/Base/SingleReview';
import { Card, CardContent, CardHeader } from '@/components/Base/Card';
import { SVG } from '@/components/Base/SVG';

const PER_VIEW = 5;

const FarmerReviews = ({ className, farmerId }) => {
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const totalReviews = React.useRef(0);

  const fetchReviews = async () => {
    setLoading(true);
    const { items, total } = await getFarmerReviews(farmerId, { skip: reviews.length, take: PER_VIEW });
    totalReviews.current = total;
    setReviews([...reviews, ...items]);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchReviews();
  }, []);

  const resetReviews = () => {
    setReviews(reviews.slice(0, PER_VIEW));
  };

  const isLast = reviews.length >= totalReviews.current;

  const t = useTranslations();
  return (
    reviews &&
    reviews.length > 0 && (
      <Card className={className}>
        <CardHeader className="border-b border-grey-200" title={t('reviews')} />
        <CardContent px="px-0">
          {reviews.map((x, i) => (
            <SingleReview key={x.id} className="border-b border-grey-200" item={x} index={i} />
          ))}
          <div className="px-4-0 py-2-2">
            <div
              onClick={() => (isLast ? resetReviews() : fetchReviews())}
              className={clsx(
                { 'pointer-events-none opacity-60': loading },
                'font-rm md:text-1-6 text-2-8 text-green flex items-center md:m-0 md:ml-auto m-auto w-mc cursor-pointer hover:text-yellow duration-150'
              )}
              aria-hidden
            >
              <span className="md:pr-0-7 pr-1-0">{t(isLast && !loading ? 'less' : 'seeMore')}</span>
              <SVG src={ArrowDownIcon} className={clsx('md:w-0-9 w-1-6 transform', { 'rotate-180': isLast })} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );
};

FarmerReviews.propTypes = {
  className: PropTypes.string,
  farmerId: PropTypes.string.isRequired
};

FarmerReviews.defaultProps = {
  className: ''
};

export default FarmerReviews;

import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '../Card';
import { SingleReview } from '../SingleReview';
import { SVG } from '../SVG';

const PER_VIEW = 5;

const Reviews = ({ className, reviews }) => {
  const [clickCount, setClickCount] = React.useState(1);

  const visibleReviews = reviews.slice(0, clickCount * PER_VIEW);

  const isLast = clickCount * PER_VIEW >= reviews.length;
  const isFirst = clickCount === 1;

  const t = useTranslations();
  return (
    <Card className={className}>
      <CardHeader className="border-b border-grey-200" title={t('reviews')} />
      <CardContent px="px-0">
        {visibleReviews.map((x, i) => (
          <SingleReview key={x.id} className="border-b border-grey-200" item={x} index={i} />
        ))}
        <div className="px-4-0 py-2-2">
          {!(isFirst && isLast) && (
            <div
              onClick={() => setClickCount((prev) => (isLast ? 1 : prev + 1))}
              className="font-rm md:text-1-6 text-2-8 text-green flex items-center md:m-0 md:ml-auto m-auto w-mc cursor-pointer hover:text-yellow duration-150"
              aria-hidden
            >
              <span className="md:pr-0-7 pr-1-0">{t(isLast ? 'less' : 'seeMore')}</span>
              <SVG src={ArrowDownIcon} className={clsx('md:w-0-9 w-1-6 transform', { 'rotate-180': isLast })} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

Reviews.propTypes = {
  className: PropTypes.string,
  reviews: PropTypes.array
};

Reviews.defaultProps = {
  className: '',
  reviews: []
};

export default Reviews;

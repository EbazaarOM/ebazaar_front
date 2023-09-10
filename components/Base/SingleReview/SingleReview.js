import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { CircleIcon } from '../CircleIcon';
import { StarRating } from '../StarRating';
import { SVG } from '../SVG';

const pallete = ['#e9515a', '#fbbb21', '#ffa6c6', '#464178', '#d6e3dd', '#4eb051'];

const SingleReview = ({ className, item, index }) => {
  const [commentsVisible, setCommentsVisibility] = React.useState(false);
  const t = useTranslations();

  const hasComments = item.comments && item.comments.length > 0;

  const palleteIndex = index % pallete.length;

  const shuffledPallete = React.useMemo(
    () =>
      pallete
        .filter((_x, i) => i !== palleteIndex)
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    [index]
  );

  return (
    <div className={clsx(className, 'px-4-2 py-4-0')}>
      <div>
        <div className="md:flex items-center">
          <div className="flex items-center">
            <CircleIcon
              className="md:w-3-3 md:h-3-3 w-6-0 h-6-0 md:mr-1-5 mr-3-3"
              style={{ backgroundColor: pallete[palleteIndex] }}
            />
            <div className="font-rm md:text-1-8 text-2-8">{item.author}</div>
          </div>
          <div className="md:ml-auto md:mt-0 mt-4-0 flex flex-col justify-between h-full">
            {!!item.mark && <StarRating editable={false} rating={item.mark} size="sm" />}
          </div>
        </div>
        <div className="w-80-percent md:text-1-8 text-2-8 font-lt md:mt-3-0 mt-4-0">{item.text}</div>
        {hasComments && (
          <div
            onClick={() => setCommentsVisibility(!commentsVisible)}
            className="font-rm md:text-1-6 text-2-8 text-green flex items-center md:m-0 md:ml-auto m-auto w-mc cursor-pointer hover:text-yellow duration-150"
            aria-hidden
          >
            <span className="md:pr-0-7 pr-1-0">{t(commentsVisible ? 'less' : 'seeAnswer')}</span>
            <SVG src={ArrowDownIcon} className={clsx({ 'rotate-180': commentsVisible }, 'md:w-0-9 w-1-6 transform')} />
          </div>
        )}
      </div>
      {commentsVisible && hasComments && (
        <div>
          {item.comments.map((x, i) => (
            <div key={x.id} className="px-4-0 mt-2-0">
              <div className="md:flex items-center">
                <div className="flex items-center">
                  <CircleIcon
                    className="md:w-2-5 md:h-2-5 w-4-0 h-4-0 md:mr-1-5 mr-3-3"
                    style={{ backgroundColor: shuffledPallete[i % shuffledPallete.length] }}
                  />
                  <div className="font-rm md:text-1-8 text-2-8">{x.author}</div>
                </div>
              </div>
              <div className="w-80-percent md:text-1-8 text-2-8 font-lt md:mt-1-5 mt-2-0">{x.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SingleReview.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  index: PropTypes.number
};

SingleReview.defaultProps = {
  className: '',
  item: {},
  index: 0
};

export default SingleReview;

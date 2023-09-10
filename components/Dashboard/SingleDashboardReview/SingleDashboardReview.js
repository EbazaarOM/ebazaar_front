import { StarRating } from '@/components/Base/StarRating';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { Accordion, AccordionDetails, AccordionSummary } from '@/components/Base/Accordion';
import { Button } from '@/components/Base/Button';
import { useTranslations } from '@/next-intl/useTranslations';
import { Popup } from '@/components/Base/Popup';
import { PopupBox } from '@/components/Base/PopupBox';
import { createComment } from '@/api/reviews';

const SingleDashboardReview = ({ className, review }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations(['reviews']);
  const commentPopupRef = React.useRef(null);

  const submitComment = async () => {
    setLoading(true);
    try {
      await createComment({ reviewId: review.id, text: newComment });
      commentPopupRef.current.close();
      setNewComment('');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Accordion expanded={expanded} className={clsx(className, 'border border-grey-200')}>
        <AccordionSummary className={clsx('pt-4-0 md:pl-4-0 pb-3-0 md:pr-6-8 px-3-0')}>
          <div className="flex md:flex-row flex-col">
            <div className="flex md:w-45-percent">
              <div className="md:w-1/4 w-30-percent">
                <Image
                  src={process.env.STATIC_RESOURCES_URL.concat(review.productImage)}
                  alt={review.productTitle}
                  width={124}
                  height={76}
                  loading="eager"
                  objectFit="cover"
                  layout="responsive"
                />
              </div>
              <div className="md:ml-1-8 ml-3-0 font-md md:text-1-6 text-2-6">
                <div>{review.productTitle}</div>
                <div className="font-lt flex items-center mt-1-0">
                  <SVG src={FarmerIcon} className="md:w-1-5 w-2-3 md:mr-1-0 mr-2-0" />
                  {review.farmerFullName}
                </div>
              </div>
            </div>
            <div className="md:flex-1 md:mt-0 mt-3-0">
              <StarRating rating={review.mark} size="sm" />
              <div className="font-lt md:text-1-6 text-2-6 md:mt-2-3 mt-3-0">{review.text}</div>
              <div
                className="w-mc ml-auto text-green md:mt-3-0 mt-4-0 font-md md:text-1-6 text-2-8 flex items-center cursor-pointer"
                onClick={() => setExpanded(!expanded)}
                aria-hidden
              >
                {t('seeAllComments')}
                <SVG
                  src={ArrowDownIcon}
                  className={clsx({ 'rotate-180': expanded }, 'transform md:w-1-0 w-1-6 ml-1-0 duration-150')}
                />
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails className={clsx('pt-3-0 md:pl-4-0 pb-4-0 md:pr-6-8 px-3-0 border-t border-grey-200')}>
          <div className="flex">
            <div className="w-45-percent md:block hidden" />
            <div className="flex-1">
              <div className="md:mb-2-0 mb-4-0 md:text-1-6 text-2-6">
                {review.comments && review.comments.length > 0 ? (
                  review.comments.map((x) => (
                    <div key={x.id} className="mb-4-0 last:mb-0">
                      <div className="flex items-center">
                        <div className="w-2-6 h-2-6 rounded-full bg-grey-200 mr-1-6" />
                        <div className="font-md">{x.author}</div>
                      </div>
                      <div className="pl-4-2 mt-2-0 font-lt">{x.text}</div>
                    </div>
                  ))
                ) : (
                  <div className="font-lt">{t('noComments')}</div>
                )}
              </div>
              <Button
                size="custom"
                className="bg-blue hover:bg-white text-white border border-blue hover:text-black ml-auto duration-150 md:w-mc w-full md:h-5-0 h-7-0 md:text-1-6 text-2-6"
                onClick={() => commentPopupRef.current.open()}
              >
                {t('addComment')}
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Popup ref={commentPopupRef} className="md:w-76-5 md:h-auto w-full h-full">
        <PopupBox title={review.productTitle} onClose={() => commentPopupRef.current.close()}>
          <div className="pb-7-0 pt-3-0">
            <div className="font-lt md:text-1-8 text-2-8">{t('addCommentCopy')}</div>
            <textarea
              rows={6}
              placeholder={t('write')}
              className="border border-grey-200 font-lt md:text-1-8 text-2-8 w-full p-3-0 mt-4-0 focus:border-blue hover:border-blue duration-150"
              style={{ resize: 'none' }}
              onChange={({ target: { value } }) => setNewComment(value)}
              value={newComment}
            />
            <Button
              size="md"
              className="bg-lightblue text-blue md:ml-auto md:w-mc w-full hover:opacity-80 duration-150 mt-5-0"
              onClick={submitComment}
              disabled={loading}
            >
              {t('writeComment')}
            </Button>
          </div>
        </PopupBox>
      </Popup>
    </>
  );
};

SingleDashboardReview.propTypes = {
  className: PropTypes.string,
  review: PropTypes.object
};

SingleDashboardReview.defaultProps = {
  className: '',
  review: {}
};

export default SingleDashboardReview;

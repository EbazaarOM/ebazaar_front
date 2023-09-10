import PropTypes from 'prop-types';
import { PopupBox } from '@/components/Base/PopupBox';
import { useTranslations } from '@/next-intl/useTranslations';
import { StarRating } from '@/components/Base/StarRating';
import { Button } from '@/components/Base/Button';
import { SuccessBox } from '@/components/Base/SuccessBox';
import { createReview } from '@/api/reviews';

const SUBMIT_STATUS = {
  NONE: 1,
  SUCCESS: 2,
  ERROR: 3
};

let timeout = null;

const AuthorizationPopup = (props) => {
  const { className, onClose, product, orderCode } = props;

  const [review, setReview] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(SUBMIT_STATUS.NONE);

  const t = useTranslations(['reviews']);

  const submitHandler = async () => {
    setLoading(true);
    try {
      await createReview({ ...review, productCode: product.code, orderCode });
      setStatus(SUBMIT_STATUS.SUCCESS);
      timeout = setTimeout(() => {
        onClose();
      }, 4000);
    } catch (error) {
      setStatus(SUBMIT_STATUS.ERROR);
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <PopupBox className={className} title={t('writeReview')} onClose={onClose}>
      {status === SUBMIT_STATUS.NONE && (
        <div className="md:text-2-0 text-2-8 font-rm py-3-0">
          <div className="">{t('reviewWriteCopy')}</div>
          <div className="mt-2-5">
            <strong>{t('productName')}: </strong>
            {product.productTitle}
          </div>
          <div className="mt-2-5">
            <strong>{t('farmer')}: </strong>
            {product.farmerFullName}
          </div>
          <div className="mt-2-5">
            <strong>{t('valueByStar')}: </strong>
            <StarRating
              editable
              className="mt-3-0"
              rating={review.mark}
              onRate={(x) => setReview({ ...review, mark: x })}
            />
            <div className="mt-1-0 text-red">*{t('reviewWriteCopy2')}</div>
          </div>
          <textarea
            rows={6}
            placeholder={t('writeComment')}
            className="border border-grey-200 font-lt w-full p-3-0 mt-4-0 focus:border-blue hover:border-blue duration-150"
            style={{ resize: 'none' }}
            onChange={({ target: { value } }) => setReview({ ...review, text: value })}
            value={review.text || ''}
          />
          <Button
            size="md"
            className="bg-lightblue text-blue md:ml-auto md:w-mc w-full hover:opacity-80 duration-150 mt-5-0"
            onClick={submitHandler}
            disabled={loading || !review.mark}
          >
            {t('writeReview')}
          </Button>
        </div>
      )}
      {status === SUBMIT_STATUS.SUCCESS && <SuccessBox title={t('reviewWriteSuccess')} />}
      {status === SUBMIT_STATUS.ERROR && (
        <div className="py-3-0 text-3-0 font-md text-red text-center">{t('error')}</div>
      )}
    </PopupBox>
  );
};

AuthorizationPopup.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  product: PropTypes.object.isRequired,
  orderCode: PropTypes.string.isRequired
};

AuthorizationPopup.defaultProps = {
  className: '',
  onClose: () => {}
};

export default AuthorizationPopup;

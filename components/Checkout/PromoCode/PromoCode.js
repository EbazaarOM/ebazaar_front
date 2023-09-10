import { Button } from '@/components/Base/Button';
import { SVG } from '@/components/Base/SVG';
import { TextField } from '@/components/Base/TextField';
import { Checkmark } from '@/components/Vectors/Checkmark';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const defaultErr = { ka: 'დაფიქსირდა შეცდომა', en: 'Error occured' };

const errorsMessages = {
  not_valid: {
    ka: 'კოდი არასწორია',
    en: 'Code is not valid'
  },
  used: {
    ka: 'კოდი გამოყენებულია',
    en: 'Code has already been used'
  },
  HasFreeDelivery: {
    ka: 'პრომო კოდი არ გახარჯულა, რადგან თქვენ უკვე სარგებლობთ უფასო მიტანის სერვისით',
    en: 'Free shipping already applies to the value of your cart. Your promo code has not been used'
  },
  first_order_already_placed: {
    ka: 'პრომო კოდი ვრცელდება მხოლოდ პირველ შეკვეთაზე',
    en: 'Promo code only applies to the First Order'
  },
  UnableToUseForSelectedProducts: {
    ka: 'ფასდაკლებულ პროდუქტებზე არ ვრცელდება პრომოკოდის ფასდაკლება',
    en: 'Discount promo codes do not apply to already discounted products'
  },
  CartLimitNotReached: {
    ka: 'კალათის მოცულობა არასაკმარისია',
    en: 'Insufficient cart value'
  }
};

const CheckoutSum = ({ onAddClick, errors, promoCode, setPromoCode, isValidPromoCode }) => {
  const t = useTranslations(['order']);
  const { locale } = useRouter();

  return (
    <div className="border-t border-grey-200 bg-white px-3-0 pt-3-0">
      <div className="flex items-center">
        <TextField
          errored={errors && errors.length > 0}
          className="flex-1"
          variant="sm"
          placeholder={t('promoCode')}
          value={promoCode}
          onChange={setPromoCode}
          disabled={isValidPromoCode}
        />
        <Button
          size="sm"
          px="md:px-2-0 px-3-0"
          className={clsx(
            [
              isValidPromoCode
                ? 'bg-green-100 text-green pointer-events-none border-green-100'
                : 'bg-yellow hover:bg-white hover:text-yellow border-yellow text-white'
            ],
            'duration-150 md:ml-1-8 ml-3-0 border w-35-percent'
          )}
          onClick={() => onAddClick(promoCode)}
        >
          {isValidPromoCode ? <SVG src={Checkmark} className="w-2-0" /> : t('add')}
        </Button>
      </div>
      <ul className="mt-2-0 pb-3-0 font-md md:text-1-8 text-2-8">
        {errors &&
          errors.map((e) => (
            <li className="text-red" key={e.key}>
              <span>
                {e.errKeys &&
                  e.errKeys.map((x) => ((errObj = defaultErr) => errObj[locale])(errorsMessages[x]))?.join(', ')}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

CheckoutSum.propTypes = {
  onAddClick: PropTypes.func,
  setPromoCode: PropTypes.func,
  promoCode: PropTypes.string,
  errors: PropTypes.array,
  isValidPromoCode: PropTypes.bool
};

CheckoutSum.defaultProps = {
  onAddClick: () => {},
  setPromoCode: () => {},
  promoCode: '',
  errors: [],
  isValidPromoCode: false
};

export default CheckoutSum;

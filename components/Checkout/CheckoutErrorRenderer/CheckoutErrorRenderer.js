import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { SVG } from '@/components/Base/SVG';
import { XIcon } from '@/components/Vectors/XIcon';

const defaultErr = { ka: 'ერორ მესიჯი არ მოიძებნა', en: 'Error message not found' };

const errorsMessages = {
  OutOfStock: {
    ka: 'ერთი ან რამოდენიმე პროდუქტი არ არის მარაგში',
    en: 'One or more product out of stock'
  },
  RegistrationNotFinished: {
    ka: 'რეგისტრაცია არ არის დასრულებული',
    en: 'Registration is not finished'
  },
  ServerError: {
    ka: 'შეცდომა, დაუკავშირდით სერვისის პროვაიდერს',
    en: 'Error, Contact service provider'
  },
  Removed: {
    ka: 'ერთი ან რამოდენიმე პროდუქტი წაიშალა ადმინისტრატორის მიერ',
    en: 'One or more has been deleted by an Administrator'
  },
  Unknown: {
    ka: 'შეცდომა, დაუკავშირდით სერვისის პროვაიდერს',
    en: 'Error, Contact service provider'
  },
  Error: {
    ka: 'დაფიქსირდა შეცდომა',
    en: 'Error occured'
  },
  FillAllFields: {
    ka: 'გთხოვთ შეავსოთ აუცილებელი ველები',
    en: 'Please fill all the required fields'
  }
};

const CheckoutErrorRenderer = ({ errors, onClose }) => {
  const { locale } = useRouter();
  return (
    <div className="w-76-5 px-5-0 pt-8-0 pb-15-0 bg-white font-md text-2-4 relative">
      <SVG
        src={XIcon}
        className="md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-200 absolute top-5-0 right-5-0"
        onClick={onClose}
      />
      <p className="text-center">{errorsMessages.Error[locale]}</p>
      <ul className="mt-2-0 list-disc pl-7-0 pr-5-0">
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

CheckoutErrorRenderer.propTypes = {
  errors: PropTypes.instanceOf(Array).isRequired,
  onClose: PropTypes.func
};

CheckoutErrorRenderer.defaultProps = {
  onClose: () => {}
};

export default CheckoutErrorRenderer;

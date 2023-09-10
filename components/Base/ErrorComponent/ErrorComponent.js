import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { CircleIcon } from '../CircleIcon';
import { RouterLink } from '../RouterLink';
import { SVG } from '../SVG';

const text = {
  ka: 'მთავარ გვერდზე დაბრუნება',
  en: 'Go to home page'
};

const ErrorComponent = ({ statusCode, message }) => {
  const { locale } = useRouter();
  return (
    <div className="error flex flex-col items-center container">
      <div className="m-auto text-lightblue-200 font-md tracking-widest" style={{ fontSize: '500px', lineHeight: 1 }}>
        {statusCode}
      </div>
      <div className="font-bd text-3-0 text-blue">{message}</div>
      <RouterLink href="/" className="font-bd text-2-4 flex items-center mt-15-0 group">
        <CircleIcon className="bg-white w-5-0 h-5-0 mr-1-6 group-hover:bg-blue group-hover:text-white duration-150 transform group-hover:-translate-x-1-0">
          <SVG src={ArrowDownIcon} className="w-2-0 transform rotate-90 -translate-x-0-1" />
        </CircleIcon>
        <div>{text[locale] || ''}</div>
      </RouterLink>
    </div>
  );
};

ErrorComponent.propTypes = {
  statusCode: PropTypes.number,
  message: PropTypes.string
};

ErrorComponent.defaultProps = {
  statusCode: 500,
  message: ''
};

export default ErrorComponent;

import { CircleIcon } from '@/components/Base/CircleIcon';
import { SVG } from '@/components/Base/SVG';
import { CallAnswerIcon } from '@/components/Vectors/CallAnswerIcon';
import { MailIcon } from '@/components/Vectors/MailIcon';
import { PinIcon } from '@/components/Vectors/PinIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const circleIconClassSet =
  'md:w-4-8 md:h-4-8 w-6-7 h-6-7 border text-black opacity-20 group-hover:opacity-100 duration-200 md:mr-2-4 mr-3-2';

const ContactInfo = ({ contactInfo, className }) => {
  const [email] = contactInfo.emails || [];
  const [phone] = contactInfo.phones || [];

  return (
    <div className={clsx(className, 'font-rm md:text-1-6 text-3-0')}>
      <a href={`mailto:${email}`} className="flex items-center group">
        <CircleIcon className={circleIconClassSet}>
          <SVG src={MailIcon} className="md:w-2-0 w-2-8 text-current" />
        </CircleIcon>
        <span className="flex-1">{email}</span>
      </a>
      <a href={`tel:${phone}`} className="flex items-center group md:mt-2-7 mt-4-0">
        <CircleIcon className={circleIconClassSet}>
          <SVG src={CallAnswerIcon} className="md:w-1-8 w-2-6 text-current" />
        </CircleIcon>
        <span className="flex-1">{phone}</span>
      </a>
      <a href="#" className="flex items-center group md:mt-2-7 mt-4-0">
        <CircleIcon className={circleIconClassSet}>
          <SVG src={PinIcon} className="md:w-2-0 w-2-8 text-current" />
        </CircleIcon>
        <span className="flex-1">{contactInfo.address}</span>
      </a>
    </div>
  );
};

ContactInfo.propTypes = {
  contactInfo: PropTypes.object,
  className: PropTypes.string
};

ContactInfo.defaultProps = {
  contactInfo: {},
  className: ''
};

export default ContactInfo;

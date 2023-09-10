import { SVG } from '@/components/Base/SVG';
import { RouterLink } from '@/components/Base/RouterLink';
import PropTypes from 'prop-types';
import { EbazaarLogoIcon } from '@/components/Vectors/EbazaarLogoIcon';

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <RouterLink href="/" aria-label="Logo">
        <SVG className="w-full h-auto" src={EbazaarLogoIcon} original />
      </RouterLink>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string
};

Logo.defaultProps = {
  className: ''
};

export default Logo;

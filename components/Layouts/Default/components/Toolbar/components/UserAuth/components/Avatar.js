import { IconButton } from '@/components/Base/IconButton';
import { getInitials } from '@/utils/getInitials';
import clsx from 'clsx';
import PropType from 'prop-types';

const Avatar = ({ className, name, onClick }) => {
  return (
    <div className={clsx(className, '')}>
      <IconButton
        className="md:w-6-0 md:h-6-0 w-9-0 h-9-0 bg-blue text-white md:text-1-8 text-2-6 font-md hover:opacity-80 duration-150"
        onClick={onClick}
      >
        {name && getInitials(name)}
      </IconButton>
    </div>
  );
};

Avatar.propTypes = {
  className: PropType.string,
  name: PropType.string,
  onClick: PropType.func
};
Avatar.defaultProps = {
  className: '',
  name: '',
  onClick: () => {}
};

export default Avatar;

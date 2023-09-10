import { SVG } from '@/components/Base/SVG';
import { XIcon } from '@/components/Vectors/XIcon';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button } from '../Button';

const btnBaseClassSet = 'hover:bg-white text-white border duration-150 w-14-0';

const DialogBox = ({ title, onAccept, onRefuse }) => {
  const { locale } = useRouter();
  return (
    <div className="w-full bg-white p-5-0">
      <SVG
        src={XIcon}
        className="ml-auto md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-150"
        onClick={onRefuse}
      />
      <div className="md:mt-2-5 mt-5-0 md:text-2-0 text-3-0 font-rm md:w-80-percent w-auto text-center m-auto">
        {title}
      </div>

      <div className="flex items-center justify-center md:mt-5-0 mt-6-0">
        <Button
          className={clsx(btnBaseClassSet, 'bg-grey border-grey hover:text-grey mr-3-0 md:w-auto w-50-percent')}
          onClick={onRefuse}
        >
          {locale === 'ka' ? 'არა' : 'No'}
        </Button>
        <Button
          className={clsx(btnBaseClassSet, 'bg-blue border-blue hover:text-blue md:w-auto w-50-percent')}
          onClick={onAccept}
        >
          {locale === 'ka' ? 'დიახ' : 'Yes'}
        </Button>
      </div>
    </div>
  );
};

DialogBox.propTypes = {
  title: PropTypes.node,
  onAccept: PropTypes.func,
  onRefuse: PropTypes.func
};

DialogBox.defaultProps = {
  title: null,
  onAccept: () => {},
  onRefuse: () => {}
};

export default DialogBox;

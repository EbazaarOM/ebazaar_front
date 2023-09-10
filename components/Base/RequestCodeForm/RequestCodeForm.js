import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { TextField } from '../TextField';

let interval = null;
const seconds = 299;

const RequestCodeForm = React.forwardRef((props, ref) => {
  const { onCodeRequest, title, className } = props;
  const [code, setCode] = React.useState('');
  const [count, setCount] = React.useState(seconds);
  const [loading, setLoading] = React.useState(false);
  const t = useTranslations();

  const reset = () => {
    setCount(seconds);
  };

  const stop = () => {
    clearInterval(interval);
  };

  const start = () => {
    interval = setInterval(() => {
      setCount((x) => x - 1);
    }, 1000);
  };

  React.useImperativeHandle(ref, () => ({
    getCode() {
      return code;
    }
  }));

  const codeRequestClickHandler = async () => {
    stop();
    setLoading(true);
    const success = await onCodeRequest();
    if (success) {
      reset();
      start();
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (count === 0) stop();
  }, [count]);

  React.useEffect(() => {
    start();
    return () => stop();
  }, []);

  const mins = Math.floor(count / 60);
  const secs = `0${count % 60}`.slice(-2);

  return (
    <div className={className}>
      <div className="md:mb-3-0 mb-4-0 md:w-80-percent md:text-1-8 text-2-8 font-lt">{title}</div>
      <TextField
        placeholder="XXXXX"
        label={t('fillCode')}
        value={code}
        onChange={setCode}
        action={
          <button
            type="button"
            className={clsx(
              { 'opacity-60 pointer-events-none': loading },
              'text-grey-600 hover:text-blue duration-150'
            )}
            onClick={codeRequestClickHandler}
          >
            {t('requestCode')}
          </button>
        }
      />
      <div className="font-rm md:text-1-6 text-2-6 md:mt-1-0 mt-2-0 ml-auto w-mc">
        {t('time')} {mins}:{secs}
      </div>
    </div>
  );
});

RequestCodeForm.displayName = 'RequestCodeForm';
RequestCodeForm.propTypes = {
  onCodeRequest: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string
};
RequestCodeForm.defaultProps = {
  onCodeRequest: () => {},
  title: '',
  className: ''
};

export default RequestCodeForm;

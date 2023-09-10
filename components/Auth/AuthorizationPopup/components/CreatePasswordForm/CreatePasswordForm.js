import { BackButton } from '@/components/Base/BackButton';
import { Button } from '@/components/Base/Button';
import { Checkbox } from '@/components/Base/Checkbox';
import { TextField } from '@/components/Base/TextField';
import { isValidPassword } from '@/utils/isValidPassword';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

const CreatePasswordForm = ({ className, onSubmit, withRules, onBackClick }) => {
  const [info, setInfo] = React.useState({});
  const [errMsg, setErrMsg] = React.useState('');
  const [accepted, setAccepted] = React.useState(false);

  const rulesRef = React.useRef(null);

  const t = useTranslations('common');

  const buttonClickHandler = () => {
    setErrMsg('');
    if (!info.password || !info.confirmPassword) {
      setErrMsg(t('fillAllFields'));
    } else if (info.password !== info.confirmPassword) {
      setErrMsg(t('passwordsDoNotMatch'));
    } else if (!isValidPassword(info.password)) {
      setErrMsg(t('passwordDoNotMatchMinimumRequirements'));
    } else if (!accepted && withRules) {
      rulesRef.current.classList.add('text-red');
    } else {
      onSubmit(info);
    }
  };

  const inputChangeHandler = (key, val) => {
    if (errMsg) setErrMsg('');
    setInfo({ ...info, [key]: val });
  };

  return (
    <div className={clsx(className, 'flex flex-col h-full')}>
      {onBackClick && <BackButton title={t('createPassword')} className="mb-4-0" onClick={onBackClick} />}
      <div className="flex-1 flex flex-col">
        <div
          className="md:text-1-8 text-2-8 font-lt md:mb-3-0 mb-4-0"
          dangerouslySetInnerHTML={{ __html: t.raw('strongPasswordCopy') }}
        />
        <TextField
          errored={!!errMsg}
          label={t('password')}
          value={info.password || ''}
          onChange={(val) => inputChangeHandler('password', val)}
          type="password"
          className="mb-3-0"
        />
        <TextField
          errored={!!errMsg}
          label={t('confirmPassword')}
          value={info.confirmPassword || ''}
          onChange={(val) => inputChangeHandler('confirmPassword', val)}
          type="password"
        />
        <div className="mt-1-0 md:text-1-8 text-2-8 font-rm text-red md:h-5-8 h-7-0 flex items-center">{errMsg}</div>
        {withRules && (
          <div className="flex items-center mb-1-5">
            <Checkbox value={accepted} onClick={() => setAccepted(!accepted)} className="mr-1-8" />
            <div className="font-lt md:text-1-8 text-2-8 flex-1" ref={rulesRef}>
              {t('acceptedRules1')}{' '}
              <a
                target="_blank"
                href={process.env.FRONTEND_URL.concat('terms-and-conditions')}
                className="underline text-blue-100"
                rel="noreferrer"
              >
                {t('acceptedRules2')}
              </a>
            </div>
          </div>
        )}

        <Button
          onClick={buttonClickHandler}
          className="bg-blue hover:opacity-80 text-white md:ml-auto duration-150 mt-auto"
          px="px-10-0"
          size="xxl"
        >
          {t('finish')}
        </Button>
      </div>
    </div>
  );
};

CreatePasswordForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  withRules: PropTypes.bool,
  onBackClick: PropTypes.func
};

CreatePasswordForm.defaultProps = {
  className: '',
  onSubmit: () => {},
  withRules: true,
  onBackClick: undefined
};

export default CreatePasswordForm;

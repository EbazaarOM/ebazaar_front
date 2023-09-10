import { IconButton } from '@/components/Base/IconButton';
import { SVG } from '@/components/Base/SVG';
import { FacebookIcon } from '@/components/Vectors/FacebookIcon';
import { GradientInstagramIcon } from '@/components/Vectors/GradientInstagramIcon';
import { LinkedinIcon } from '@/components/Vectors/LinkedinIcon';
import { YoutubeIcon } from '@/components/Vectors/YoutubeIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const base = 'border text-grey-300';

const SocialSet = ({ social, className, isContact }) => {
  const iconButtonClassSet = clsx(
    [isContact ? 'md:w-4-8 md:h-4-8 w-9-0 h-9-0' : 'md:w-4-8 md:h-4-8 w-6-7 h-6-7'],
    base
  );
  return (
    <div className={clsx(className)}>
      <div className={clsx('flex items-center', { 'md:justify-start justify-between': isContact })}>
        <a href={social.facebook} target="_blank" rel="noreferrer" className="md:mr-3-2 mr-4-0">
          <IconButton
            aria-label="Facebook"
            className={clsx(iconButtonClassSet, [
              isContact ? 'hover:text-facebook border-grey-300' : 'hover:text-black duration-200'
            ])}
          >
            <SVG
              src={FacebookIcon}
              className={clsx([isContact ? 'md:w-1-0 w-1-9' : 'md:w-1-0 w-1-5'], 'text-current')}
            />
          </IconButton>
        </a>
        <a href={social.instagram} target="_blank" rel="noreferrer" className="md:mr-3-2 mr-4-0">
          <IconButton
            aria-label="Instagram"
            className={clsx(
              iconButtonClassSet,
              [isContact ? 'border-grey-300 colored' : 'hover:text-black duration-200'],
              'gradient-instagram'
            )}
          >
            <GradientInstagramIcon className={clsx([isContact ? 'md:w-2-0 w-3-7' : 'md:w-2-0 w-2-8'])} />
          </IconButton>
        </a>
        <a href={social.linkedin} target="_blank" rel="noreferrer" className="md:mr-3-2 mr-4-0">
          <IconButton
            aria-label="Linkedin"
            className={clsx(iconButtonClassSet, [
              isContact ? 'hover:text-linkedin border-grey-300' : 'hover:text-black duration-200'
            ])}
          >
            <SVG
              src={LinkedinIcon}
              className={clsx([isContact ? 'md:w-1-9 w-3-5' : 'md:w-1-9 w-2-6'], 'text-current')}
            />
          </IconButton>
        </a>
        <a href={social.youtube} target="_blank" rel="noreferrer">
          <IconButton
            aria-label="Youtube"
            className={clsx(iconButtonClassSet, [
              isContact ? 'hover:text-youtube border-grey-300' : 'hover:text-black duration-200'
            ])}
          >
            <SVG
              src={YoutubeIcon}
              className={clsx([isContact ? 'md:w-2-0 w-3-7' : 'md:w-2-0 w-2-8'], 'text-current')}
            />
          </IconButton>
        </a>
      </div>
    </div>
  );
};

SocialSet.propTypes = {
  social: PropTypes.object,
  className: PropTypes.string,
  isContact: PropTypes.bool
};

SocialSet.defaultProps = {
  social: {},
  className: '',
  isContact: false
};

export default SocialSet;

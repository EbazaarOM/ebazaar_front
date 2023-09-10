import PropTypes from 'prop-types';

import clsx from 'clsx';
import { FacebookIcon } from '@/components/Vectors/FacebookIcon';
import { LinkedinIcon } from '@/components/Vectors/LinkedinIcon';
import useSiteUrl from '@/hooks/useSiteUrl';
import { CopyLinkIcon } from '@/components/Vectors/CopyLinkIcon';
import { SVG } from '../SVG';

const svgClassSet = 'text-grey-300 hover:text-black duration-200 cursor-pointer';

const ArticleTools = (props) => {
  const { className, url, quote } = props;

  const siteUrl = useSiteUrl();

  const shareUrl = url || siteUrl;

  const tooltipRef = React.useRef(null);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(shareUrl);
    tooltipRef.current.classList.add('tooltip--active');
    setTimeout(() => {
      tooltipRef.current.classList.remove('tooltip--active');
    }, 500);
  };

  return (
    <ul className={clsx(className, 'flex items-center')}>
      <li className="md:mr-2-6 mr-5-5" title="Share on Facebook">
        <a
          href={`https://www.facebook.com/sharer/sharer?u=${encodeURIComponent(shareUrl)}&quote=${quote}`}
          rel="noreferrer"
          target="_blank"
          aria-label="Facebook"
        >
          <SVG className={clsx(svgClassSet, 'md:w-1-0 w-2-0')} src={FacebookIcon} />
        </a>
      </li>
      <li className="md:mr-2-6 mr-5-5" title="Share on LinkedIn">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite?url=${encodeURIComponent(shareUrl)}`}
          rel="noreferrer"
          target="_blank"
          aria-label="Linkedin"
        >
          <SVG className={clsx(svgClassSet, 'md:w-2-0 w-4-4')} src={LinkedinIcon} />
        </a>
      </li>
      <li
        title="Copy to clipboard"
        className="tooltip"
        onClick={copyToClipBoard}
        aria-hidden
        tooltip-text="Link Copied"
        ref={tooltipRef}
      >
        <SVG className={clsx(svgClassSet, 'md:w-1-8 w-3-8')} src={CopyLinkIcon} />
      </li>
    </ul>
  );
};

ArticleTools.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  quote: PropTypes.string
};

ArticleTools.defaultProps = {
  className: '',
  url: '',
  quote: ''
};

export default ArticleTools;

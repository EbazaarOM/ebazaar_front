import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RouterLink = (props) => {
  const { href, as, replace, scroll, shallow, locale, children, ...rest } = props;

  const router = useRouter();

  return (
    <Link href={href} as={as} replace={replace} scroll={scroll} shallow={shallow} locale={locale || router.locale}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

RouterLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  as: PropTypes.string,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  locale: PropTypes.string
};

RouterLink.defaultProps = {
  children: null,
  as: '',
  replace: false,
  scroll: true,
  shallow: false,
  locale: ''
};

export default RouterLink;

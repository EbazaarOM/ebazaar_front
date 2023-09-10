import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { SVG } from '../SVG';

const insertSeparators = (items, separator) => {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      // eslint-disable-next-line no-param-reassign
      acc = acc.concat(
        current,
        <li aria-hidden key={'separator'.concat('-', index)} className={clsx('md:mx-1-0 mx-1-6')}>
          {separator}
        </li>
      );
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
};

const Breadcrumb = (props) => {
  const { children, className, ...rest } = props;

  const seperator = <SVG className="md:w-1-0 w-1-5 transform -rotate-90" src={ArrowDownIcon} />;

  const items = React.Children.toArray(children);

  const allItems = items
    .filter((child) => React.isValidElement(child))
    .map((child, index) => (
      <li className={clsx({ 'font-md': index === items.length - 1 })} key={'child'.concat('-', index)}>
        {child}
      </li>
    ));

  return (
    <div className={clsx(className, 'md:text-1-8 text-2-8 font-rm')} {...rest}>
      <ul className="flex items-center">{insertSeparators(allItems, seperator)}</ul>
    </div>
  );
};

Breadcrumb.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Breadcrumb.defaultProps = {
  children: null,
  className: ''
};

export default Breadcrumb;

import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const SingleCategory = ({ className, category, firstLevelCategoryId, level, onCategoryClick, selectedPath }) => {
  const isInPath = selectedPath.indexOf(category.id) > -1;
  const [expanded, setExpanded] = React.useState(isInPath);

  const categoryClickHandler = () => {
    setExpanded(true);
    onCategoryClick(category.id, level !== 0 && firstLevelCategoryId);
  };

  return (
    <div className={clsx(className, 'md:font-lt font-rm', { 'md:ml-2-0 ml-4-0': level !== 0 })}>
      <div className="relative md:mb-0-5 mb-2-0 flex">
        <div className="md:w-2-5 w-6-0 flex items-center -ml-0-5">
          {category.children && category.children.length > 0 && (
            <div
              className="w-full cursor-pointer py-0-8 md:pl-0-5 pl-1-0"
              onClick={() => setExpanded(!expanded)}
              aria-hidden
            >
              <SVG
                src={ArrowDownIcon}
                className={clsx('md:w-1-0 transform', {
                  '-rotate-90': !expanded,
                  'w-2-5': level === 0,
                  'w-2-0': level === 1
                })}
              />
            </div>
          )}
        </div>
        <div
          onClick={categoryClickHandler}
          aria-hidden
          className={clsx('cursor-pointer md:text-1-8 flex-1', {
            'md:font-md md:text-current text-green': isInPath,
            'text-4-0': level === 0,
            'text-3-0': level === 1,
            'text-2-6': level === 2
          })}
        >
          {category.title}
        </div>
      </div>
      {expanded && (
        <div>
          {category.children &&
            category.children.map((c) => (
              <SingleCategory
                firstLevelCategoryId={firstLevelCategoryId}
                selectedPath={selectedPath}
                key={c.id}
                category={c}
                level={level + 1}
                onCategoryClick={onCategoryClick}
              />
            ))}
        </div>
      )}
    </div>
  );
};

SingleCategory.propTypes = {
  className: PropTypes.string,
  category: PropTypes.object,
  firstLevelCategoryId: PropTypes.number,
  level: PropTypes.number,
  onCategoryClick: PropTypes.func,
  selectedPath: PropTypes.array
};

SingleCategory.defaultProps = {
  className: '',
  category: {},
  firstLevelCategoryId: null,
  level: 0,
  onCategoryClick: () => {},
  selectedPath: []
};

export default SingleCategory;

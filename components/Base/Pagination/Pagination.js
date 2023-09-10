import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import useResize from '@/hooks/useResize';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { IconButton } from '../IconButton';
import { SVG } from '../SVG';

const arrowColorSet = {
  primary: 'bg-body-bg hover:bg-grey-200',
  secondary: 'bg-white hover:bg-grey-200'
};

const Pagination = (props) => {
  const { page, pageCount, pageRange, onPageChange, color, isSmall } = props;

  const { width } = useResize();
  const isMobile = width <= 768 && width !== 0;

  return (
    <div className={clsx({ 'react-pagination--small': isSmall }, 'react-pagination text-secondary-main md:px-0')}>
      <ReactPaginate
        previousLabel={
          <IconButton className={clsx(arrowColorSet[color], 'w-full h-full duration-150')}>
            <SVG
              src={ArrowDownIcon}
              className={clsx([isSmall ? 'md:w-1-3 w-1-9' : 'w-1-9'], 'transform rotate-90 -translate-x-0-1')}
            />
          </IconButton>
        }
        nextLabel={
          <IconButton className={clsx(arrowColorSet[color], 'w-full h-full duration-150')}>
            <SVG
              src={ArrowDownIcon}
              className={clsx([isSmall ? 'md:w-1-3 w-1-9' : 'w-1-9'], 'transform -rotate-90 translate-x-0-1')}
            />
          </IconButton>
        }
        // breakLabel="..."
        pageCount={pageCount}
        pageRangeDisplayed={isMobile ? 2 : pageRange}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        marginPagesDisplayed={0}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={page - 1}
      />
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  pageCount: PropTypes.number,
  pageRange: PropTypes.number,
  onPageChange: PropTypes.func,
  color: PropTypes.oneOf(Object.keys(arrowColorSet)),
  isSmall: PropTypes.bool
};

Pagination.defaultProps = {
  page: 1,
  pageCount: 1,
  pageRange: 6,
  onPageChange: () => {},
  color: 'primary',
  isSmall: false
};

export default Pagination;

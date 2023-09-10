import { useFarmers } from '@/api/farmer/swr';
import { useProducts } from '@/api/products/swr';
import { SearchIcon } from '@/components/Vectors/SearchIcon';
import { XIcon } from '@/components/Vectors/XIcon';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '../Button';
import { SVG } from '../SVG';
import { SearchResults } from './components/SearchResults';

const SearchBar = ({ className, visibleOnMobile, onClose }) => {
  const t = useTranslations();
  const router = useRouter();
  const [searchResultsIsVisible, setSearchResultsVisibility] = React.useState(false);

  const [searchWord, setSearchWord] = React.useState('');
  const debouncedSearchWord = useDebounce(searchWord, 500);

  const { items: products } = useProducts({ searchWord: debouncedSearchWord, take: 6 }, debouncedSearchWord.length > 2);
  const { items: farmers } = useFarmers({ searchWord: debouncedSearchWord, take: 3 }, debouncedSearchWord.length > 2);

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${searchWord}`);
  };

  React.useEffect(() => {
    if (searchWord) setSearchWord('');
    if (searchResultsIsVisible) setSearchResultsVisibility(false);
  }, [router]);

  const isVisible = searchResultsIsVisible && debouncedSearchWord.length >= 3;
  const hasResults = (products && products.length > 0) || (farmers && farmers.length > 0);

  return (
    <div
      className={clsx(
        className,
        { 'md:opacity-100 md:pointer-events-auto opacity-0 pointer-events-none': !visibleOnMobile },
        'md:static fixed inset-0 bg-white z-1 overflow-auto'
      )}
    >
      <div
        className={clsx('relative md:p-0 pt-3-0 pb-4-0 px-5-0 border-b border-grey-200 md:border-0 flex items-center', {
          'z-2': isVisible
        })}
      >
        <div className="md:h-6-0 h-9-0 rounded-60-0 bg-body-bg flex items-center justify-between md:px-2-8 px-4-0 md:text-1-6 text-2-6 font-rm flex-1">
          <form onSubmit={submitHandler} className="flex-1 h-full">
            <input
              onFocus={() => setSearchResultsVisibility(true)}
              className="w-full h-full"
              placeholder={t('searchWord')}
              value={searchWord}
              onChange={({ target: { value } }) => setSearchWord(value)}
            />
          </form>
          <SVG src={SearchIcon} className="md:w-2-4 w-3-0" />
        </div>
        <SVG src={XIcon} className="w-3-4 md:hidden ml-3-0" onClick={onClose} />
      </div>
      <div
        className={clsx(
          { 'md:opacity-0 md:translate-y-3-0 md:pointer-events-none': !isVisible },
          'md:absolute top-100-percent z-98 md:transform duration-200 left-0 md:w-70-percent h-auto overflow-auto bg-white md:border border-grey-200 md:pb-0 pb-22-0'
        )}
      >
        <div className="px-7-0 h-10-0 md:flex hidden items-center justify-between font-md text-2-0 upper">
          <div>
            {t('searchResults')} {!hasResults && <span>- 0</span>}
          </div>
          <button onClick={() => setSearchResultsVisibility(false)} type="button" aria-label="Close">
            <SVG src={XIcon} className="w-2-0 hover:rotate-90 transform duration-200" />
          </button>
        </div>
        {hasResults && (
          <>
            <SearchResults products={products} farmers={farmers} t={t} />
            <div className="px-5-0 py-3-2 md:static fixed bottom-7-0 left-0 right-0">
              <Button
                size="xl"
                className="bg-blue border border-blue text-white hover:bg-white hover:text-blue md:ml-auto md:w-auto w-full"
                onClick={submitHandler}
              >
                {t('seeMore')}
              </Button>
            </div>
          </>
        )}
      </div>
      {isVisible && (
        <div
          className="md:block hidden fixed inset-0 z-1"
          onClick={() => setSearchResultsVisibility(false)}
          aria-hidden
        />
      )}
    </div>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  visibleOnMobile: PropTypes.bool,
  onClose: PropTypes.func
};

SearchBar.defaultProps = {
  className: '',
  visibleOnMobile: false,
  onClose: () => {}
};

export default SearchBar;

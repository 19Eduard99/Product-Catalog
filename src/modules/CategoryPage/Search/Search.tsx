import React, {
  useMemo,
  useEffect,
  useCallback,
  useState,
  useRef,
} from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  category: string;
};

export const Search: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActive, setIsActive] = useState(window.innerWidth < 640);
  const query = searchParams.get('query') || '';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = query;
    }
  }, [query]);

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const debouncedSetSearchWith = useMemo(
    () =>
      debounce((value: string | null) => {
        setSearchWith({ query: value, page: null });
      }, 500),
    [setSearchWith],
  );

  useEffect(() => {
    const handleResize = () => {
      setIsActive(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      debouncedSetSearchWith.cancel();
    };
  }, [debouncedSetSearchWith]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchWith(e.target.value || null);
  };

  const handleIconClick = () => {
    if (window.innerWidth >= 640) {
      setIsActive(prev => !prev);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={classNames(styles.search, { [styles.active]: isActive })}>
      <input
        type="text"
        className={styles.search__input}
        placeholder={`Search ${category.toLowerCase()}`}
        defaultValue={query}
        onChange={handleSearch}
        ref={inputRef}
      />
      <span className={styles.search__icon} onClick={handleIconClick}>
        <i className="fa fa-search"></i>
      </span>
    </div>
  );
};

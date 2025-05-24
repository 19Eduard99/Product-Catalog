import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import classNames from 'classnames';
import { getVisiblePages } from '../../utils/getVisiblePages';
import { SearchParams } from '../../utils/searchHelper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (params: SearchParams) => void;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
  setShowLoading,
}: PaginationProps) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const totalPages = Math.ceil(total / perPage);
  const visiblePages = getVisiblePages(totalPages, currentPage);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const handlePageChange = (page: number) => {
    setShowLoading(true);
    if (page >= 1 && page <= totalPages) {
      onPageChange({ page: page.toString() === '1' ? null : page.toString() });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.pagination__mobile}>
        <button
          className={classNames(
            styles.pagination__navBtn,
            [styles['pagination__navBtn--prev']],
            [styles[`pagination__navBtn--prev--${theme}`]],
            {
              [styles['pagination__navBtn--disabled']]: currentPage === 1,
            },
          )}
          onClick={() => handlePageChange(currentPage - 1)}
        />

        <span className={styles.pagination__mobileText}>
          {currentPage} / {totalPages}
        </span>

        <button
          className={classNames(
            styles.pagination__navBtn,
            [styles['pagination__navBtn--next']],
            [styles[`pagination__navBtn--next--${theme}`]],
            {
              [styles['pagination__navBtn--disabled']]:
                currentPage === totalPages,
            },
          )}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    );
  }

  return (
    <div className={styles.paginationWrapper}>
      <ul className={styles.pagination}>
        <li
          className={classNames(
            styles.pagination__item,
            styles['pagination__item--prev'],
            {
              [styles['pagination__item--disabled']]: currentPage === 1,
            },
          )}
        >
          <a
            className={classNames(
              styles.pagination__link,
              styles[`pagination__link--${theme}`],
            )}
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          />
        </li>

        {visiblePages.map((page, index) =>
          page === '...' ? (
            <li key={`ellipsis-${index}`} className={styles.pagination__item}>
              <span className={styles.pagination__link}>…</span>
            </li>
          ) : (
            <li
              key={page}
              className={classNames(styles.pagination__item, {
                [styles['pagination__item--active']]: page === currentPage,
              })}
            >
              <a
                className={styles.pagination__link}
                href={`#${page}`}
                onClick={e => {
                  e.preventDefault();
                  handlePageChange(Number(page));
                }}
              >
                {page}
              </a>
            </li>
          ),
        )}

        <li
          className={classNames(
            styles.pagination__item,
            styles['pagination__item--next'],
            {
              [styles['pagination__item--disabled']]:
                currentPage === totalPages,
            },
          )}
        >
          <a
            className={classNames(
              styles.pagination__link,
              styles[`pagination__link--${theme}`],
            )}
            href="#next"
            aria-disabled={currentPage === totalPages}
            onClick={e => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          />
        </li>
      </ul>
    </div>
  );
};

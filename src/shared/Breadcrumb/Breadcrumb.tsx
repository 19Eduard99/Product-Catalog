import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

type Props = {
  pathnames: string[];
};

export const Breadcrumb: React.FC<Props> = ({ pathnames }) => {
  const theme = useSelector((state: RootState) => state.theme.value);

  const homeIcon =
    theme === 'light'
      ? 'img/icons/home-light-theme.svg'
      : 'img/icons/home-dark-theme.svg';

  return (
    <nav className={styles.breadcrumb}>
      <ul className={styles.breadcrumb__list}>
        <li className={styles.breadcrumb__item}>
          <Link to="/" className={styles.breadcrumb__link}>
            <img
              src={homeIcon}
              alt="home"
              className={styles.breadcrumb__icon}
            />
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className={styles.breadcrumb__item}>
              <img
                src="img/icons/arrow-right-gray.svg"
                alt="arrow"
                className={styles.breadcrumb__arrow}
              />

              {!isLast ? (
                <Link to={to} className={styles.breadcrumb__link}>
                  {value}
                </Link>
              ) : (
                <span className={styles.breadcrumb__text}>{value}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

export const Footer: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const logoSrc =
    theme === 'dark'
      ? 'img/icons/logo-dark-theme.svg'
      : 'img/icons/logo-light-theme.svg';
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__content}>
          <Link to="/">
            <img src={logoSrc} alt="logo" className={styles.footer__logo} />
          </Link>

          <nav className={styles.footer__nav}>
            <ul className={styles.footer__list}>
              <li className={styles.footer__item}>
                <a
                  href="https://github.com/19Eduard99"
                  className={styles.footer__link}
                >
                  GitHub
                </a>
              </li>
              <li className={styles.footer__item}>
                <a href="#" className={styles.footer__link}>
                  Contacts
                </a>
              </li>
              <li className={styles.footer__item}>
                <a href="#" className={styles.footer__link}>
                  Rights
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.footer__top}>
            <button
              type="button"
              className={styles.footer__topLink}
              onClick={handleScrollTop}
            >
              Back to top
              <span className={styles[`footer__topIcon--${theme}`]} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

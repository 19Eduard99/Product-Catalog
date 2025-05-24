import React from 'react';
import styles from './HeaderActions.module.scss';
import { NavLink } from 'react-router-dom';

import { ThemeToggle } from '../../../components/ThemeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { toggleTheme } from '../../../store/themeSlice';

type Props = {
  getNavLinkClass: ({ isActive }: { isActive: boolean }) => string;
  favoritesCount: number;
  cartCount: number;
  setIsBurgerActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HeaderActions: React.FC<Props> = ({
  getNavLinkClass,
  favoritesCount,
  cartCount,

  setIsBurgerActive,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  const actionLinks = [
    {
      to: '/favorites',
      alt: 'favorites',
      className: 'header__favorites',
      icon:
        theme === 'light'
          ? 'img/icons/favorites-empty-light-theme.svg'
          : 'img/icons/favorites-empty-dark-theme.svg',
    },
    {
      to: '/cart',
      alt: 'cart',
      className: 'header__cart',
      icon:
        theme === 'light'
          ? 'img/icons/cart-light.svg'
          : 'img/icons/cart-dark.svg',
    },
  ];

  return (
    <div className={styles.actions}>
      <ThemeToggle checked={theme === 'dark'} onChange={handleClick} />
      {actionLinks.map(({ to, alt, className, icon }) => (
        <button key={to} className={styles[className]}>
          <NavLink
            to={to}
            className={getNavLinkClass}
            onClick={() => setIsBurgerActive(false)}
          >
            <img src={icon} alt={alt} />
            {to === '/favorites' && favoritesCount > 0 && (
              <span className={styles.actions__count}>{favoritesCount}</span>
            )}

            {to === '/cart' && cartCount > 0 && (
              <span className={styles.actions__count}>{cartCount}</span>
            )}
          </NavLink>
        </button>
      ))}
    </div>
  );
};

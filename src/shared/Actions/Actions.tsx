import React from 'react';
import styles from './Actions.module.scss';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

type Props = {
  isInCart: boolean;
  isFavorite: boolean;
  toggleFavorite: () => void;
  toggleCart: () => void;
};

export const Actions: React.FC<Props> = ({
  isInCart,
  isFavorite,
  toggleFavorite,
  toggleCart,
}) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const favoritesIcon =
    theme === 'light'
      ? 'img/icons/favorites-empty-light-theme.svg'
      : 'img/icons/favorites-empty-dark-theme.svg';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleCart();
  };

  return (
    <div className={styles.actions}>
      <button
        className={classNames(styles.actions__addToCart, {
          [styles.actions__addToCartActive]: isInCart,
        })}
        onClick={handleAddToCartClick}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        onClick={handleClick}
        type="button"
        className={styles.actions__like}
      >
        {isFavorite ? (
          <img src="img/icons/favorites-full.svg" alt="Remove from favorites" />
        ) : (
          <img src={favoritesIcon} alt="Add to favorites" />
        )}
      </button>
    </div>
  );
};

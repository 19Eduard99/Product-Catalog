import React from 'react';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { ProductType } from '../../../types/ProductType';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';

type Props = {
  product: ProductType;
  quantity: number;
  productPrice: number;
  onRemove: (id: string) => (e: React.MouseEvent) => void;
  handleIncrement: (id: string) => () => void;
  handleDecrement: (id: string) => () => void;
};

export const CartItem: React.FC<Props> = props => {
  const {
    product,
    quantity,
    productPrice,
    onRemove,
    handleIncrement,
    handleDecrement,
  } = props;
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <div className={styles.product} key={product.itemId}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.product__link}
      >
        <div className={styles.product__preview}>
          <div className={styles.product__previewMedia}>
            <button
              className={styles.product__removeButton}
              onClick={onRemove(product.itemId)}
            />
            <img
              className={styles.product__image}
              src={product.image}
              alt={product.name}
            />
          </div>
          <h2 className={styles.product__title}>{product.name}</h2>
        </div>
      </Link>
      <div className={styles.product__info}>
        <div className={styles.product__quantity}>
          <button
            className={classNames(
              styles.product__quantityDecrement,
              styles[`product__quantityDecrement--${theme}`],
            )}
            onClick={handleDecrement(product.itemId)}
            disabled={quantity === 1}
          />
          <span className={styles.product__quantityValue}>{quantity}</span>
          <button
            className={classNames(
              styles.product__quantityIncrement,
              styles[`product__quantityIncrement--${theme}`],
            )}
            onClick={handleIncrement(product.itemId)}
          />
        </div>
        <span className={styles.product__price}>${productPrice}</span>
      </div>
    </div>
  );
};

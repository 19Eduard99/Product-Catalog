import React from 'react';
import styles from './ProductLoading.module.scss';

export const ProductLoading: React.FC = () => {
  return (
    <div className={`${styles.product} ${styles['product--loading']}`}>
      <div className={styles.product__preview}></div>
      <div className={styles.product__info}>
        <span className={styles.product__name}></span>
        <span className={styles.product__name}></span>
        <span className={styles.product__name}></span>
        <div className={styles.product__description}></div>
      </div>
    </div>
  );
};

import React from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
  size?: number;
}

export const Loading: React.FC<LoadingProps> = ({ size = 80 }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTopColor: 'var(--color-accent)',
  };

  return (
    <main>
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner} style={spinnerStyle}></div>
      </div>
    </main>
  );
};

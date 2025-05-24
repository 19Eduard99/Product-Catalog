import React from 'react';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: React.FC<{
  checked: boolean;
  onChange: () => void;
}> = ({ checked, onChange }) => (
  <div className={styles.themeToggle}>
    {/* eslint-disable-next-line */}
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.slider}>
        <span className={styles.slider__sun}>☀️</span>
        <span className={styles.slider__moon}>🌙</span>
      </span>
    </label>
  </div>
);

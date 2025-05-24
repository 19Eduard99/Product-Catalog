import { StylesConfig } from 'react-select';

export const reactSelectStyles: StylesConfig = {
  control: () => ({
    display: 'flex',
    border: 'var(--default-border)',
    boxShadow: 'none',
    backgroundColor: 'var(--color-surface-2)',
    width: '100%',
    marginBottom: '24px',
    fontFamily: 'Mont, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-color)',
    cursor: 'pointer',
  }),
  menu: base => ({
    ...base,
    width: '100%',
    border: '1px solid var(--color-elements)',
    borderRadius: '0',
    boxShadow: 'none',
    backgroundColor: 'var(--color-surface-1)',
    fontFamily: 'Mont, sans-serif',
    color: 'var(--text-color)',
  }),
  menuList: () => ({
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    padding: '8px 12px',
    backgroundColor: state.isSelected
      ? 'var(--color-accent)'
      : state.isFocused
        ? 'var(--color-surface-2)'
        : 'var(--color-surface-1)',
    color: state.isSelected ? 'var(--color-white)' : 'var(--text-color)',
    cursor: 'pointer',
    fontFamily: 'Mont, sans-serif',
    ':active': {
      backgroundColor: state.isSelected
        ? 'var(--color-accent-hover)'
        : 'var(--color-surface-2)',
    },
  }),

  dropdownIndicator: base => ({
    ...base,
    color: 'var(--text-color)',
    ':hover': {
      color: 'var(--text-color)',
      backgroundColor: 'transparent',
    },
  }),
  singleValue: base => ({
    ...base,
    color: 'var(--text-color)',
    fontFamily: 'Mont, sans-serif',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

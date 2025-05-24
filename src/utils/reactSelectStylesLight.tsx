import { StylesConfig } from 'react-select';

export const reactSelectStyles: StylesConfig = {
  control: () => ({
    display: 'flex',
    border: '1px solid #1c1c1c',
    boxShadow: 'none',
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: '24px',
    fontFamily: 'Mont, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
  }),
  menu: base => ({
    ...base,
    width: '100%',
    border: '1px solid #E2E6E9',
    borderRadius: '0',
    boxShadow: 'none',
    backgroundColor: '#fff',
    fontFamily: 'Mont, sans-serif',
    color: 'red',
  }),
  menuList: () => ({
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    padding: '8px 12px',
    backgroundColor: state.isSelected
      ? '#313237'
      : state.isFocused
        ? '#f5f5f5'
        : '#fff',
    color: '#89939A',
    cursor: 'pointer',
    fontFamily: 'Mont, sans-serif',
    ':active': {
      backgroundColor: state.isSelected ? 'var(--color-accent)' : '#2a2d3a',
    },
  }),
  dropdownIndicator: base => ({
    ...base,
    color: '#1c1c1c',
    ':hover': {
      color: '#1c1c1c',
      backgroundColor: 'transparent',
    },
  }),
  singleValue: base => ({
    ...base,
    color: '#1c1c1c',
    fontFamily: 'Mont, sans-serif',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

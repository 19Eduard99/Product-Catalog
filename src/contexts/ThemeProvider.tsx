import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/type';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.value);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  return <>{children}</>;
};

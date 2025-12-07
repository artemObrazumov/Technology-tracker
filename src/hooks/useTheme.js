import { useState, useEffect, useCallback } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) return savedTheme;
    return 'light';
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const applyTheme = useCallback((theme) => {
    document.body.setAttribute('data-theme', theme);
    document.body.classList.remove('light-theme', 'dark-theme', 'auto-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('app-theme', theme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    setIsLoaded(true);
  }, [applyTheme, theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setThemeMode = useCallback((mode) => {
    if (['light', 'dark', 'auto'].includes(mode)) {
      setTheme(mode);
    }
  }, []);

  const getCurrentTheme = useCallback(() => {
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  return {
    theme,
    setTheme: setThemeMode,
    toggleTheme,
    getCurrentTheme,
    isLoaded,
    isDark: getCurrentTheme() === 'dark',
    isLight: getCurrentTheme() === 'light'
  };
};

export default useTheme;
import { useState, useEffect, useCallback } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) return savedTheme;
    return "auto";
  });

  const applyTheme = useCallback((themeValue) => {
    let effectiveTheme = themeValue;
    if (effectiveTheme === "auto") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.body.setAttribute("data-theme", effectiveTheme);
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${effectiveTheme}-theme`);
    localStorage.setItem("app-theme", themeValue); // Persist user's choice ('auto')
  }, []);

  useEffect(() => {
    applyTheme(theme);

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = (e) => {
      if (theme === "auto") {
        applyTheme("auto");
      }
    };

    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setThemeMode = useCallback((mode) => {
    if (["light", "dark", "auto"].includes(mode)) {
      setTheme(mode);
    }
  }, []);

  const getCurrentTheme = useCallback(() => {
    if (theme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  }, [theme]);

  return {
    theme,
    setTheme: setThemeMode,
    toggleTheme,
    getCurrentTheme,
    isDark: getCurrentTheme() === "dark",
  };
};
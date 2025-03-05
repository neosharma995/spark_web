"use client";

import { createContext, useContext, useState, useEffect } from "react";

 
const ThemeContext = createContext();

 
export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return true;
  });

 
  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "light" : "dark");
      return newMode;
    });
  };

 
  useEffect(() => {
    document.body.classList.toggle("light-mode", isLightMode);
  }, [isLightMode]);

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

 
export const useTheme = () => useContext(ThemeContext);
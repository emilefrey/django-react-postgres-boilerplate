import React, { createContext, useState, useReducer, useEffect } from 'react';

export type ThemeContextProps = {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextProps>({
  darkMode: false,
  setDarkMode: () => { }
});


let localState = false
const storedThemeState = localStorage.getItem("darkMode");
if (typeof storedThemeState === 'string') {
  localState = JSON.parse(storedThemeState)
}

const ThemeContextProvider = (props: any) => {

  const [darkMode, setDarkMode] = useState<boolean>(localState)

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{
      darkMode,
      setDarkMode
    }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;

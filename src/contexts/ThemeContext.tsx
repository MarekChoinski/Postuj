import React, { createContext, useState } from 'react';

type themeTypes = "light" | "mood" | "dark";
type UpdateType = React.Dispatch<React.SetStateAction<themeTypes>>;

const defaultTheme = "light";

// export const ThemeContext = createContext<themeTypes>("light");

const defaultUpdate: UpdateType = () => defaultTheme;


export const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: defaultUpdate
});

type Props = {
  children: React.ReactNode,
};

const ThemeContextProvider: React.FC<Props> = props => {

  const { children } = props;

  const [theme, setTheme] = useState<themeTypes>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );

};

export default ThemeContextProvider;

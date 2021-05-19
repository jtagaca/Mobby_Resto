import {
  DarkTheme,
  Colors,
  configureFonts,
  DefaultTheme,
} from "react-native-paper";
// import { fonts } from './fonts';

const dark = {
  ...DarkTheme,
  // fonts: configureFonts(fonts),
  colors: {
    ...DarkTheme.colors,
    primary: "#00665e",
    accent:  "#301934",
    surface: "#000000",
  },
};

const light = {
  ...DefaultTheme,
  // fonts: configureFonts(fonts),
  colors: {
    ...DefaultTheme.colors,

    primary: "#009387",
   
    accent:  "#006400",
    
    surface: "#FFFFFF",
  },
};

const darkTheme = {
  ...dark,
};
const lightTheme = {
  ...light,
};

export { darkTheme, lightTheme };

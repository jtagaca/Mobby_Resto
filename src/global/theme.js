import { DarkTheme, Colors, configureFonts, DefaultTheme } from 'react-native-paper';
// import { fonts } from './fonts';

const dark = {
    ...DarkTheme,
    // fonts: configureFonts(fonts),
    colors: {
        ...DarkTheme.colors,
        primary: "#009387",
        accent: Colors.lightGreen800,
        surface: Colors.grey800,
    }
}

const light = {
    ...DefaultTheme,
    // fonts: configureFonts(fonts),
    colors: {
        ...DefaultTheme.colors,
        primary: "#9932CC",
        accent: Colors.lightGreen800,
        surface: Colors.grey300,
    },
    


}

const darkTheme = {
    ...dark
}
const lightTheme = {
    ...light
}

export { darkTheme, lightTheme };
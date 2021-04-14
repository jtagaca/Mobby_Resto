import { DarkTheme, Colors, configureFonts, DefaultTheme } from 'react-native-paper';
// import { fonts } from './fonts';

const dark = {
    ...DarkTheme,
    // fonts: configureFonts(fonts),
    colors: {
        ...DarkTheme.colors,
        primary: Colors.lightBlue300,
        accent: Colors.lightGreen800,
        surface: Colors.grey800,
    }
}

const light = {
    ...DefaultTheme,
    // fonts: configureFonts(fonts),
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.lightblue800,
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
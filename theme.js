import { extendTheme } from "native-base"

const theme = extendTheme({
    config:{
        initialColorMode: 'light',
        useSystemColorMode: true,
    },
    colors: {
        light:{
            background:{
                50: '#9ffff9',
                100: '#77fff6'
            },
            text: {
                50: 'black'
            }
        },
        dark: {
            background: {
                900: '#15756e'
            },
            text: {
                50: 'white'
            }
        },
        primary: {
            500: '#07e1d2',
            600: '#0cc3b7'
        }
    },
    components: {
        Button: {
            baseStyle: {
                rounded: 'md'
            }
        },
        Input: {
            defaultProps: {
                variant: 'underlined'
            }
        }
    }
});

export default theme;
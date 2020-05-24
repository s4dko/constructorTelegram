import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    // overrides: {
    //     MuiButton: {
    //         root: {
    //             fontWeight: "bold",
    //             backgroundColor: "#00000",
    //             margin: "10px",
    //             "&:hover": {
    //                 backgroundColor: "red"
    //             }
    //         }
    //     }
    // },
    // buttonCreateBot: {
    //     background: '#000000',
    //     color: '#FFF',
    //     '&:hover': {
    //         background: '#FFFFFF',
    //         color: '#FFF'
    //     }
    // },
    palette: {
        secondary: {
            main: '#EAEAEA'
        },
        primary: {
            main: '#2261c6'
        },
        white:{
            main: '#FFFFFF'
        },
        mygray:{
            main: '#e5e7ed'
        },
        save:{
            main: '#27ae60'
        }
    }
});
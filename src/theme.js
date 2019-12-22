import { createMuiTheme } from '@material-ui/core/styles';
import { orange, teal, grey, red } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';

export const theme = createMuiTheme({
    palette: {
        primary: { main: teal[700] },
        secondary: { main: orange[900] },
    },
    
});
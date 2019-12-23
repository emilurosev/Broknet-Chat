import { createMuiTheme } from '@material-ui/core/styles';
import { orange, teal } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        primary: { main: teal[700] },
        secondary: { main: orange[900] },
        type: 'light',
    },
    
});
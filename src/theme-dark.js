import { createMuiTheme } from '@material-ui/core/styles';
import { orange, teal } from '@material-ui/core/colors';

export const themeDark = createMuiTheme({
    palette: {
        primary: { main: teal[500] },
        secondary: { main: orange[900] },
        type: 'dark',
    },
    
});
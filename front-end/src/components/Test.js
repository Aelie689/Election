import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from '../Theme';

function Test() {
    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained">Primary Button</Button>
            <Button variant="contained" color="secondary">Secondary Button</Button>
            <Button 
                variant="contained" 
                sx={{ backgroundColor: theme.palette.a.main, color: '#fff' }}
            >
                AAAAAA
            </Button>

            {/* Button using custom color `b` */}
            <Button 
                variant="contained" 
                sx={{ backgroundColor: theme.palette.b.main, color: '#fff' }}
            >
                BBBBBBB
            </Button>
        </ThemeProvider>  
    );
}

export default Test;
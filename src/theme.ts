'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: { fontFamily: 'var(--font-geist-sans)' }, // или Roboto из доки
    // cssVariables: true, // по желанию (см. раздел CSS theme variables в доке)
});

export default theme;

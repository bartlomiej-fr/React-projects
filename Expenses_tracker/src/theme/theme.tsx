import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}


export const theme = createTheme(
  {
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#1b5e20',
      },
      secondary: {
        main: '#1b5e20',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  }
);
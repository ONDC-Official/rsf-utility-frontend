import { createTheme, PaletteOptions, ThemeOptions } from '@mui/material/styles'
import colors from 'theme/colors'
import typography from 'theme/typography'

const theme: ThemeOptions = createTheme({
  palette: {
    ...(colors as unknown as PaletteOptions),
    primary: {
      main: colors.primary.main,
      contrastText: colors.primary.contrastText,
    },
    background: {
      default: colors.background.main,
      paper: colors.background.light,
    },
  },
  shape: { borderRadius: 8 },
  typography,
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '15px',
          borderBottom: 'none',
        },
        head: {
          color: colors.text.secondary,
          fontWeight: 500,
          fontSize: '14px',
          backgroundColor: 'transparent',
        },
        body: {
          color: colors.text.primary,
          fontWeight: 400,
          backgroundColor: colors.background.light,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            cursor: 'pointer',
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
        page: {
          '&.Mui-selected': {
            backgroundColor: colors.primary.main,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: colors.primary.main,
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          '&.Mui-selected': {
            background: 'linear-gradient(90deg, #1C75BC 0%, #0D3656 100%)',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(90deg, #1C75BC 0%, #0D3656 100%)',
            },
            '& .MuiListItemIcon-root': {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.light,
          borderRadius: '4px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
          '&:hover': {
            backgroundColor: colors.primary.dark,
          },
        },
      },
    },
  },
})

export default theme

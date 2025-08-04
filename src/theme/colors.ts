import { IColors } from './types/palette';

const colors: IColors = {
  error: {
    main: '#DC3545',
    light: '#FCEBE9',
    dark: '#E43625',
    contrastText: '#1B2F5714',
  },
  warning: {
    main: '#FFC107',
    light: '#FFF9E6',
    dark: '#C6C6C64F',
    contrastText: '#DFE0E5',
    tertiaryMain: '#EB7413',
    tertiaryWarning: '#FFFDFB',
  },
  success: {
    main: '#28A745',
    light: '#757575',
    dark: '#1C7530',
    contrastText: '#EAF6EC',
    secondary: '#F0F5F3',
  },
  primary: {
    main: '#0B3352',
    contrastText: '#FFFFFF',
    light: '#1C75BC',
    dark: '#0D3656',
    inputFieldText: '#323639',
  },
  secondary: {
    main: '#1B2F57',
    light: '#798190',
    dark: '#575757',
    contrastText: '#1C1C1C',
  },
  background: {
    main: '#F5F5F5',
    light: '#FFFFFF',
    dark: '#0000001F',
    contrastText: '#0A0D120D',
    tertiaryMain: '#FCFCFC',
  },
  text: {
    primary: '#213049',
    secondary: '#5B6578',
    disabled: '#4A4A4A',
    contrastText: '#40172F',
    tertiary: '#1E232C',
    subHeading: '#30343D',
    caption: '#2E2E2E',
  },
  border: {
    primary: '#EBEBEB',
    secondary: '#FFC107',
    disabled: '#EBECEF',
    contrastText: '#18273A',
    tertiary: '#DEDEDE',
  },
  status: {
    accepted: '#28A745',
    pending: '#6C757D',
  },
  shadow: {
    primary: '#1B2F5717',
    secondary: '#0A0D120D',
    tertiary: '#E6E6E6',
    disabled: '#E9EBEF',
    contrastText: '#FCFCFC',
  },
  placeholder: {
    main: '#BDBDBD',
    dark: '#1C2129',
    light: '#2B2F40',
    contrastText: '#0D0D0D',
  },
  button: {
    primary: '#3B5998',
    secondary: '#E5E7EB',
    tertiary: '#D1D5DB',
    disabled: '#3B3B3B',
    subHeading: '#BFBFBF',
    contrastText: '#061632',
  },
  playgroundBorder: {
    main: '#9EC2FF',
    light: '#37333B',
    dark: '#243465',
    contrastText: '#C4C8D3',
  },
  playgroundBackground: {
    main: '#DBE8FF',
    light: '#BBF7D0',
    dark: '#F0FDF4',
    contrastText: '#848A9C',
  },
};

export default colors;
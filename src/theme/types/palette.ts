export interface IColorVariant {
  main: string
  light?: string
  dark?: string
  contrastText?: string
  tertiaryMain?: string
  tertiaryWarning?: string
  secondary?: string
  inputFieldText?: string
  disabled?: string
  tertiary?: string
  subHeading?: string
  caption?: string
  primary?: string
  accepted?: string
  pending?: string
}

export interface IColors {
  error: IColorVariant
  warning: IColorVariant
  success: IColorVariant
  primary: IColorVariant
  secondary: IColorVariant
  background: IColorVariant
  text: IColorVariant
  border: IColorVariant
  status: IColorVariant
  shadow: IColorVariant
  placeholder: IColorVariant
  button: IColorVariant
  playgroundBorder: IColorVariant
  playgroundBackground: IColorVariant
  alert: IColorVariant
  neutral: IColorVariant
}

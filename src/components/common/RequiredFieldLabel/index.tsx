import { FC } from 'react'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'
import { RequiredFieldLabelProps } from 'components/common/RequiredFieldLabel/types'
import colors from '@theme/colors'

const RequiredFieldLabel: FC<RequiredFieldLabelProps> = ({
  children,
  variant = TypographyVariant.Body2Semibold,
  ...props
}) => {
  return (
    <Typography variant={variant} {...props}>
      {children}
      <span style={{ color: colors.error.main }}> *</span>
    </Typography>
  )
}

export default RequiredFieldLabel

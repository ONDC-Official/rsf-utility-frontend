import { FC } from 'react'
import { Warning } from '@mui/icons-material'
import { PageHeader as Container, Left, Right, AlertContainer } from 'styles/pages/SettlementGenerator.styled'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'

const HeaderSection: FC = () => (
  <Container>
    <Left>
      <Typography variant={TypographyVariant.H4}>Settlement Generator</Typography>
      <Typography variant={TypographyVariant.H6}>Select orders to prepare for settlement</Typography>
    </Left>
    <Right>
      <AlertContainer>
        <Warning fontSize="small" />
        Settlement Window closes at 11:00 PM
      </AlertContainer>
    </Right>
  </Container>
)

export default HeaderSection

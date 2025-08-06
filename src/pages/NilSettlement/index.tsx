import { TypographyVariant } from 'enums/typography'
import {
  Container,
  Header,
  HeaderLeft,
  PageTitle,
  PageSubtitle,
  NoticeBox,
  NoticeIconBox,
  NoticeTextBox,
  Wrapper,
  ActionButtons,
} from 'styles/pages/NilSettlement.styled'
import { CalendarTodayOutlined, InfoOutlined, WarningAmberOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'styles/components/Button.styled'

const NilSettlement = () => {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle variant={TypographyVariant.H3Semibold}>Nil Settlement</PageTitle>
          <PageSubtitle>Trigger nil settlement when no transactions are recorded for a cycle</PageSubtitle>
        </HeaderLeft>
      </Header>
      <Wrapper>
        <Typography variant={TypographyVariant.H5Semibold}>
          <InfoOutlined sx={{ mr: 1 }} /> Nil Settlement Trigger
        </Typography>
        <NoticeBox>
          <NoticeIconBox>
            <WarningAmberOutlined />
          </NoticeIconBox>
          <NoticeTextBox>
            <Typography variant={TypographyVariant.H6Semibold} color="warning.main">
              Important Notice
            </Typography>
            <Typography color="warning.main">
              Nil settlement should only be triggered when there are no transactions recorded for the current settlement
              cycle. This action will generate a settlement payload with zero amounts.
            </Typography>
          </NoticeTextBox>
        </NoticeBox>
        <ActionButtons>
          <PrimaryButton startIcon={<InfoOutlined />}>Trigger Nil Settlement</PrimaryButton>
          <SecondaryButton variant="outlined" startIcon={<CalendarTodayOutlined />}>
            Schedule Nil Settlement
          </SecondaryButton>
        </ActionButtons>
      </Wrapper>
    </Container>
  )
}

export default NilSettlement

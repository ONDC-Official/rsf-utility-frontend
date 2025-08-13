import { FC } from 'react'
import { TypographyVariant } from 'enums/typography'
import {
  Container,
  Header,
  HeaderLeft,
  NoticeBox,
  NoticeIconBox,
  NoticeTextBox,
  Wrapper,
  ActionButtons,
} from 'styles/pages/NilSettlement.styled'
import {
  // CalendarTodayOutlined,
  InfoOutlined,
  WarningAmberOutlined,
} from '@mui/icons-material'
import { Typography } from '@mui/material'
import Button from 'components/common/Button'
import { useUserContext } from 'context/userContext'
import useGenerateNilSettlement from 'hooks/mutations/useGenerateNilSettlement'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { useToast } from 'context/toastContext'
import { GENERATE_NIL_SETTLEMENT, TRIGGER_ACTION } from 'constants/toastMessages'
import { useLoader } from 'context/loaderContext'

const NilSettlement: FC = () => {
  const { selectedUser } = useUserContext()
  const toast = useToast()
  const { showLoader, hideLoader } = useLoader()

  const isUserSelected = !!selectedUser?._id

  const { triggerAsync: triggerNil, isLoading: isTriggeringNil } = useGenerateNilSettlement(selectedUser?._id || '')

  const { triggerAsync: triggerAction, isLoading: isTriggeringSettle } = useTriggerAction(selectedUser?._id || '')

  const handleTriggerNil = async (): Promise<void> => {
    try {
      showLoader()
      const res = await triggerNil()
      toast(GENERATE_NIL_SETTLEMENT.SUCCESS)

      if (res?.success) {
        await triggerAction('settle', res.data)
        toast(TRIGGER_ACTION.SUCCESS)
      }
    } catch (err) {
    } finally {
      hideLoader()
    }
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Typography variant={TypographyVariant.Body1Regular}>
            Trigger nil settlement when no transactions are recorded for a cycle
          </Typography>
        </HeaderLeft>
      </Header>

      <Wrapper>
        <Typography variant={TypographyVariant.H6Bold}>
          <InfoOutlined sx={{ mr: 1 }} /> Nil Settlement Trigger
        </Typography>

        <NoticeBox>
          <NoticeIconBox>
            <WarningAmberOutlined />
          </NoticeIconBox>
          <NoticeTextBox>
            <Typography variant={TypographyVariant.H6Bold} color="warning.main">
              Important Notice
            </Typography>
            <Typography color="warning.main">
              Nil settlement should only be triggered when there are no transactions recorded for the current settlement
              cycle. This action will generate a settlement payload with zero amounts.
            </Typography>
          </NoticeTextBox>
        </NoticeBox>

        <ActionButtons>
          <Button
            variant="contained"
            startIcon={<InfoOutlined />}
            onClick={handleTriggerNil}
            disabled={!isUserSelected || isTriggeringNil || isTriggeringSettle}
          >
            Trigger Nil Settlement
          </Button>
          {/* <Button
            variant="outlined"
            startIcon={<CalendarTodayOutlined />}
            disabled={!isUserSelected || isTriggeringNil || isTriggeringSettle}
          >
            Schedule Nil Settlement
          </Button> */}
        </ActionButtons>
      </Wrapper>
    </Container>
  )
}

export default NilSettlement

import React from 'react'
import { TypographyVariant } from 'enums/typography'
import {
  Container,
  Header,
  HeaderLeft,
  PageTitle,
  PageSubtitle,
  Wrapper,
  TableHeader,
  TableActions,
  TableTitle,
  HeaderRight,
} from 'styles/pages/MiscSettlements.styled'
import { CalendarToday, GetApp, Upload } from '@mui/icons-material'
import useGenerateMiscSettlement from 'hooks/mutations/useGenerateMiscSettlement'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { useToast } from 'context/toastContext'
import { GENERATE_MISC_SETTLEMENT, TRIGGER_ACTION } from 'constants/toastMessages'
import { useUserContext } from 'context/userContext'
import SettlementDetailsForm from './components/SettlementDetailsForm'
import SettlementsTable from './components/SettlementsTable'
import Button from 'components/common/Button'
import { MiscSettlementFormValues } from '@interfaces/miscSettlements'

const MiscSettlements: React.FC = () => {
  const toast = useToast()
  const { selectedUser } = useUserContext()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const handleSubmit = async (values: MiscSettlementFormValues) => {
    const payload = {
      provider: {
        id: values.providerId,
        name: values.providerName,
        bank_details: {
          account_no: values.bankAccountNumber,
          ifsc_code: values.ifscCode,
        },
        amount: {
          currency: 'INR',
          value: values.providerAmount,
        },
      },
      self: {
        amount: {
          currency: 'INR',
          value: values.selfAmount,
        },
      },
    }

    try {
      const res = await miscMutation.triggerAsync(payload)
      toast(GENERATE_MISC_SETTLEMENT.SUCCESS)

      if (res?.success) {
        await triggerAction.triggerAsync('settle', res.data)
        toast(TRIGGER_ACTION.SUCCESS)
      }
    } catch (e) {
      toast(GENERATE_MISC_SETTLEMENT.ERROR)
    }
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle variant={TypographyVariant.H3Semibold}>Miscellaneous Settlements</PageTitle>
          <PageSubtitle>Create ad-hoc settlements for special cases</PageSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <Button variant="outlined" startIcon={<Upload />}>
            Upload
          </Button>
        </HeaderRight>
      </Header>

      <SettlementDetailsForm onSubmit={handleSubmit} isSubmitting={miscMutation.isLoading || triggerAction.isLoading} />

      <Wrapper>
        <TableHeader>
          <TableTitle variant={TypographyVariant.Caption1Semibold}>Miscellaneous Settlement Details</TableTitle>
          <TableActions>
            <Button variant="outlined" startIcon={<CalendarToday />}>
              Filter by date
            </Button>
            <Button variant="contained" startIcon={<GetApp />}>
              Export
            </Button>
          </TableActions>
        </TableHeader>
        <SettlementsTable />
      </Wrapper>
    </Container>
  )
}

export default MiscSettlements

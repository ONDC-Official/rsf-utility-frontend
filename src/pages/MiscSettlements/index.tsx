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
} from 'styles/pages/MiscSettlements.styled'
import { CalendarToday, GetApp } from '@mui/icons-material'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import useGenerateMiscSettlement from 'hooks/mutations/useGenerateMiscSettlement'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { useToast } from 'context/toastContext'
import { GENERATE_MISC_SETTLEMENT, TRIGGER_ACTION } from 'constants/toastMessages'
import { useUserContext } from 'context/userContext'
import SettlementDetailsForm, { FormValues } from './components/SettlementDetailsForm'
import SettlementsTable from './components/SettlementsTable'

const MiscSettlements: React.FC = () => {
  const toast = useToast()
  const { selectedUser } = useUserContext()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const handleSubmit = (values: FormValues) => {
    const payload = {
      provider: {
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

    miscMutation.trigger(payload, {
      onSuccess: (res) => {
        toast(GENERATE_MISC_SETTLEMENT.SUCCESS)
        if (res?.success) {
          triggerAction.trigger('settle', {
            onSuccess: () => toast(TRIGGER_ACTION.SUCCESS),
            onError: () => toast(TRIGGER_ACTION.ERROR),
          })
        }
      },
      onError: () => toast(GENERATE_MISC_SETTLEMENT.ERROR),
    })
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <PageTitle variant={TypographyVariant.H3Semibold}>Miscellaneous Settlements</PageTitle>
          <PageSubtitle>Create ad-hoc settlements for special cases</PageSubtitle>
        </HeaderLeft>
      </Header>

      <SettlementDetailsForm onSubmit={handleSubmit} isSubmitting={miscMutation.isLoading || triggerAction.isLoading} />

      <Wrapper>
        <TableHeader>
          <TableTitle variant={TypographyVariant.Caption1Semibold}>Miscellaneous Settlement Details</TableTitle>
          <TableActions>
            <OutlinedFilterButton variant="outlined" startIcon={<CalendarToday />}>
              Filter by date
            </OutlinedFilterButton>
            <ContainedExportButton variant="outlined" startIcon={<GetApp />}>
              Export
            </ContainedExportButton>
          </TableActions>
        </TableHeader>
        <SettlementsTable />
      </Wrapper>
    </Container>
  )
}

export default MiscSettlements

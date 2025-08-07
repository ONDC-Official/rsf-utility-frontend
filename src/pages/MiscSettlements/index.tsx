import React from 'react'
import { TypographyVariant } from 'enums/typography'
import {
  Container,
  Header,
  HeaderLeft,
  Wrapper,
  TableHeader,
  TableActions,
  HeaderRight,
} from 'styles/pages/MiscSettlements.styled'
import { Upload } from '@mui/icons-material'
import useGenerateMiscSettlement from 'hooks/mutations/useGenerateMiscSettlement'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import { useToast } from 'context/toastContext'
import { GENERATE_MISC_SETTLEMENT, TRIGGER_ACTION } from 'constants/toastMessages'
import { useUserContext } from 'context/userContext'
import SettlementDetailsForm from './components/SettlementDetailsForm'
import SettlementsTable from './components/SettlementsTable'
import Button from 'components/common/Button'
import { MiscSettlementFormValues } from '@interfaces/miscSettlements'
import { useLoader } from 'context/loaderContext'

import CalenderIcon from 'assets/images/svg/CalendarIcon'
import ExportIcon from 'assets/images/svg/ExportIcon'
import ChveronIcon from 'assets/images/svg/ChveronIcon'
import { Typography } from '@mui/material'

const MiscSettlements: React.FC = () => {
  const toast = useToast()
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const handleSubmit = async (values: MiscSettlementFormValues) => {
    try {
      showLoader()
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
      const res = await miscMutation.triggerAsync(payload)
      toast(GENERATE_MISC_SETTLEMENT.SUCCESS)

      if (res?.success) {
        await triggerAction.triggerAsync('settle', res.data)
        toast(TRIGGER_ACTION.SUCCESS)
      }
    } catch (e) {
      toast(GENERATE_MISC_SETTLEMENT.ERROR)
    } finally {
      hideLoader()
    }
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Typography variant={TypographyVariant.H4}>Miscellaneous Settlements</Typography>
          <Typography>Create ad-hoc settlements for special cases</Typography>
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
          <Typography variant={TypographyVariant.H6Bold}>Miscellaneous Settlement Details</Typography>
          <TableActions>
            <Button variant="outlined" startIcon={<CalenderIcon />} endIcon={<ChveronIcon />}>
              Filter by date
            </Button>
            <Button variant="outlined" startIcon={<ExportIcon />}>
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

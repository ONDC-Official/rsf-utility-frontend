import { FC } from 'react'
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
import { GetApp, Upload } from '@mui/icons-material'
import DateFilterButton from 'components/common/DateFilterButton'
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
import { Typography } from '@mui/material'

const MiscSettlements: FC = () => {
  const toast = useToast()
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const handleSubmit = async (values: MiscSettlementFormValues): Promise<void> => {
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
            <DateFilterButton variant="outlined" onDateChange={() => {}} />
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

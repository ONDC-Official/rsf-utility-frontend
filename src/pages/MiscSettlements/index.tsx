import { FC, useState } from 'react'
import { Typography } from '@mui/material'
// import { Upload } from '@mui/icons-material'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import Button from 'components/common/Button'
import SettlementDetailsForm from './components/SettlementDetailsForm'
import SettlementsTable from './components/SettlementsTable'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import useGenerateMiscSettlement from 'hooks/mutations/useGenerateMiscSettlement'
import { IDateRange } from 'components/common/DateRangePickerButton/types'
import { useToast } from 'context/toastContext'
import { useLoader } from 'context/loaderContext'
import { useUserContext } from 'context/userContext'
import { TypographyVariant } from 'enums/typography'
import { MiscSettlementFormValues } from '@interfaces/miscSettlements'
import { GENERATE_MISC_SETTLEMENT, TRIGGER_ACTION } from 'constants/toastMessages'
import {
  Container,
  Header,
  HeaderLeft,
  Wrapper,
  TableHeader,
  TableActions,
  HeaderRight,
  FormsContainer,
  FormWrapper,
  RotatedSendIcon,
  // DeleteButton,
} from 'styles/pages/MiscSettlements.styled'

const MiscSettlements: FC = () => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
  const [forms, setForms] = useState<Array<{ id: string; data?: MiscSettlementFormValues }>>([{ id: '1' }])
  const toast = useToast()
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const handleSubmit = async (values: MiscSettlementFormValues, _formId: string): Promise<void> => {
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

  const handleAddForm = (): void => {
    const newId = (forms.length + 1).toString()
    setForms([...forms, { id: newId }])
  }

  const handleDeleteForm = (formId: string): void => {
    if (forms.length > 1) {
      setForms(forms.filter((form) => form.id !== formId))
    }
  }

  const handleDateRangeChange = (newDateRange: IDateRange): void => {
    setDateRange(newDateRange)
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Typography variant={TypographyVariant.H4}>Miscellaneous Settlements</Typography>
          <Typography>Create ad-hoc settlements for special cases</Typography>
        </HeaderLeft>
        <HeaderRight>
          <Button variant="outlined" onClick={handleAddForm}>
            Add
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<RotatedSendIcon />}
            disabled={miscMutation.isLoading || triggerAction.isLoading}
          >
            Create a Trigger Settlement
          </Button>
        </HeaderRight>
      </Header>

      <FormsContainer>
        {forms.map((form, _index) => (
          <FormWrapper key={form.id}>
            <SettlementDetailsForm
              onSubmit={(values) => handleSubmit(values, form.id)}
              isSubmitting={miscMutation.isLoading || triggerAction.isLoading}
              onDelete={() => handleDeleteForm(form.id)}
              showDelete={forms.length > 1}
            />
          </FormWrapper>
        ))}
      </FormsContainer>

      <Wrapper>
        <TableHeader>
          <Typography variant={TypographyVariant.H6Bold}>Miscellaneous Settlement Details</Typography>
          <TableActions>
            <DateRangePickerButton
              variant="outlined"
              selectedDateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </TableActions>
        </TableHeader>
        <SettlementsTable />
      </Wrapper>
    </Container>
  )
}

export default MiscSettlements

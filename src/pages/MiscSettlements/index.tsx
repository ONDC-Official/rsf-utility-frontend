import { FC, useState } from 'react'
import { Typography } from '@mui/material'
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
} from 'styles/pages/MiscSettlements.styled'
import PayloadPreview from 'pages/MiscSettlements/PayloadPreview'

const emptyFormValues: MiscSettlementFormValues = {
  selfAmount: '',
  providerAmount: '',
  providerId: '',
  providerName: '',
  bankAccountNumber: '',
  ifscCode: '',
}

const MiscSettlements: FC = () => {
  const [dateRange, setDateRange] = useState<IDateRange>({ startDate: null, endDate: null })
  const [showPayloadPreview, setShowPayloadPreview] = useState(false)
  const [miscResponseData, setMiscResponseData] = useState<any>(null)
  const [forms, setForms] = useState<Array<{ id: string; data: MiscSettlementFormValues }>>([
    { id: '1', data: { ...emptyFormValues } },
  ])
  const toast = useToast()
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const handleFormChange = (id: string, newData: MiscSettlementFormValues) => {
    setForms((prev) => prev.map((f) => (f.id === id ? { ...f, data: newData } : f)))
  }

  const handleAddForm = () => {
    setForms((prev) => [...prev, { id: (prev.length + 1).toString(), data: { ...emptyFormValues } }])
  }

  const handleDeleteForm = (formId: string) => {
    if (forms.length > 1) {
      setForms((prev) => prev.filter((f) => f.id !== formId))
    }
  }

  const handleDateRangeChange = (newDateRange: IDateRange) => {
    setDateRange(newDateRange)
  }

  const handleAllSubmit = async () => {
    try {
      showLoader()

      console.log(forms)

      const payloads = forms.map((form) => {
        const values = form.data
        return {
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
      })

      return
      const res = await miscMutation.triggerAsync(payloads)

      if (res?.success) {
        setMiscResponseData(res.data)
        toast(GENERATE_MISC_SETTLEMENT.SUCCESS)
        setShowPayloadPreview(true)
      }
    } catch (e) {
      toast(GENERATE_MISC_SETTLEMENT.ERROR)
    } finally {
      hideLoader()
    }
  }

  const handleTriggerSettlement = async (): Promise<void> => {
    if (!miscResponseData) return

    try {
      await triggerAction.triggerAsync('settle', miscResponseData)
      toast(TRIGGER_ACTION.SUCCESS)
      setShowPayloadPreview(false)
    } catch (e) {
      toast(TRIGGER_ACTION.ERROR)
    } finally {
      hideLoader()
    }
  }

  // const selectableProviders = useMemo(() => {

  // }, [])

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
            variant="contained"
            startIcon={<RotatedSendIcon />}
            disabled={miscMutation.isLoading || triggerAction.isLoading}
            onClick={handleAllSubmit}
          >
            Create a Trigger Settlement
          </Button>
        </HeaderRight>
      </Header>

      <FormsContainer>
        {forms.map((form) => (
          <FormWrapper key={form.id}>
            <SettlementDetailsForm
              defaultValues={form.data}
              onChange={(data) => handleFormChange(form.id, data)}
              onDelete={() => handleDeleteForm(form.id)}
              showDelete={forms.length > 1}
            />
          </FormWrapper>
        ))}
      </FormsContainer>

      <PayloadPreview
        data={miscResponseData}
        onTrigger={handleTriggerSettlement}
        open={showPayloadPreview}
        onClose={() => setShowPayloadPreview(false)}
      />

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

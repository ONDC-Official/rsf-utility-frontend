import React from 'react'
import { FC } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Tooltip, Typography } from '@mui/material'
import DateRangePickerButton from 'components/common/DateRangePickerButton'
import Button from 'components/common/Button'
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
import SettlementDetailsForm from './components/SettlementDetailsForm' // updated child below
import { AddCircleOutline } from '@mui/icons-material'

type FormValues = {
  settlements: MiscSettlementFormValues[]
}

const emptyFormValues: MiscSettlementFormValues = {
  selfAmount: '',
  providerAmount: '',
  providerId: '',
  providerName: '',
  bankAccountNumber: '',
  ifscCode: '',
}

const MiscSettlements: FC = () => {
  const [dateRange, setDateRange] = React.useState<IDateRange>({ startDate: null, endDate: null })
  const [showPayloadPreview, setShowPayloadPreview] = React.useState(false)
  const [miscResponseData, setMiscResponseData] = React.useState<any>(null)

  const toast = useToast()
  const { selectedUser } = useUserContext()
  const provider_details = selectedUser?.provider_details || []
  const { showLoader, hideLoader } = useLoader()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const { control, handleSubmit, setValue, formState, watch } = useForm<FormValues>({
    defaultValues: { settlements: [{ ...emptyFormValues }] },
    mode: 'onChange', // to make formState.isValid update on change
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'settlements',
  })

  const handleAddForm = () => {
    if (fields.length < provider_details.length) {
      append({ ...emptyFormValues })
    }
  }

  const selectedProviderIds = watch('settlements')
    .map((s) => s.providerId)
    .filter(Boolean)

  const onSubmit = async (data: FormValues) => {
    try {
      showLoader()
      const payloads = data.settlements.map((values) => {
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

      const res = await miscMutation.triggerAsync(payloads)

      if (res?.success) {
        setMiscResponseData(res.data)
        toast(GENERATE_MISC_SETTLEMENT.SUCCESS)
        setShowPayloadPreview(true)
      } else {
        toast(GENERATE_MISC_SETTLEMENT.ERROR)
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

  const handleDateRangeChange = (newDateRange: IDateRange) => setDateRange(newDateRange)

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Typography variant={TypographyVariant.H4}>Miscellaneous Settlements</Typography>
          <Typography>Create ad-hoc settlements for special cases</Typography>
        </HeaderLeft>
        <HeaderRight>
          <Tooltip title={fields.length >= provider_details.length ? 'All providers have been added' : ''}>
            <span>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutline />}
                onClick={handleAddForm}
                // disabled={fields.length >= provider_details.length}
              >
                Add
              </Button>
            </span>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<RotatedSendIcon />}
            disabled={miscMutation.isLoading || triggerAction.isLoading || formState.isSubmitting}
            onClick={() => {
              void handleSubmit(onSubmit)()
            }}
          >
            Create a Trigger Settlement
          </Button>
        </HeaderRight>
      </Header>

      <FormsContainer>
        {fields.map((field, index) => {
          const filteredProviders = provider_details.filter(
            (p) =>
              !selectedProviderIds.includes(p.provider_id) ||
              p.provider_id === watch(`settlements.${index}.providerId`),
          )

          return (
            <FormWrapper key={field.id}>
              <SettlementDetailsForm
                control={control}
                index={index}
                providers={filteredProviders}
                setValue={setValue}
                onRemove={() => remove(index)}
                showDelete={fields.length > 1}
              />
            </FormWrapper>
          )
        })}
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

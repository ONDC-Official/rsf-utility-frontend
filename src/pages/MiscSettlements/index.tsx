import React from 'react'
import { FC } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { Typography } from '@mui/material'
import Button from 'components/common/Button'
import SettlementsTable from './components/SettlementsTable'
import useTriggerAction from 'hooks/mutations/useTriggerAction'
import useGenerateMiscSettlement from 'hooks/mutations/useGenerateMiscSettlement'
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
  HeaderRight,
  FormsContainer,
  FormWrapper,
  RotatedSendIcon,
} from 'styles/pages/MiscSettlements.styled'
import PayloadPreview from 'pages/MiscSettlements/PayloadPreview'
import SettlementDetailsForm from './components/SettlementDetailsForm'
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
  const [showPayloadPreview, setShowPayloadPreview] = React.useState(false)
  const [miscResponseData, setMiscResponseData] = React.useState<any>(null)

  const toast = useToast()
  const { selectedUser } = useUserContext()
  const provider_details = selectedUser?.provider_details || []
  const { showLoader, hideLoader } = useLoader()

  const miscMutation = useGenerateMiscSettlement(selectedUser?._id || '')
  const triggerAction = useTriggerAction(selectedUser?._id || '')

  const { control, handleSubmit, setValue, formState } = useForm<FormValues>({
    defaultValues: { settlements: [{ ...emptyFormValues }] },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'settlements',
  })

  const handleAddForm = (): void => {
    append({ ...emptyFormValues })
  }

  const onSubmit = async (data: FormValues) => {
    try {
      showLoader()

      const payloads = data.settlements.map((values) => {
        const payload: any = {
          self: {
            amount: {
              currency: 'INR',
              value: values.selfAmount,
            },
          },
        }

        if (values.providerId) {
          payload.provider = {
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
          }
        }

        return payload
      })

      const res = await miscMutation.triggerAsync(payloads)

      if (res?.success) {
        setMiscResponseData(res.data)
        toast(GENERATE_MISC_SETTLEMENT.SUCCESS)
        setShowPayloadPreview(true)
      }
    } catch (e) {
    } finally {
      hideLoader()
    }
  }

  const handleTriggerSettlement = async (): Promise<void> => {
    if (!miscResponseData) return

    try {
      const res = await triggerAction.triggerAsync('settle', miscResponseData)
      if (res.success) {
        toast(TRIGGER_ACTION.SUCCESS)
      }

      setShowPayloadPreview(false)
    } catch (e) {
    } finally {
      hideLoader()
    }
  }

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Typography variant={TypographyVariant.Body1Regular}>Create ad-hoc settlements for special cases</Typography>
        </HeaderLeft>
        <HeaderRight>
          <Button variant="outlined" startIcon={<AddCircleOutline />} onClick={handleAddForm}>
            Add
          </Button>

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
        {fields.map((field, index) => (
          <FormWrapper key={field.id}>
            <SettlementDetailsForm
              control={control}
              index={index}
              providers={provider_details}
              setValue={setValue}
              onRemove={() => remove(index)}
              showDelete={fields.length > 1}
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
        </TableHeader>
        <SettlementsTable />
      </Wrapper>
    </Container>
  )
}

export default MiscSettlements

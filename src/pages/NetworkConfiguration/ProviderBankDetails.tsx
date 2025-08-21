import { FC } from 'react'
import { useFieldArray, Controller, FieldError } from 'react-hook-form'
import { Typography } from '@mui/material'
import BankIcon from 'assets/images/svg/BankIcon'
import AddIcon from 'assets/images/svg/AddIcon'
import RemoveIcon from 'assets/images/svg/RemoveIcon'
import { IProviderBankDetailsProps, IFieldConfig } from 'pages/NetworkConfiguration/type'
import { defaultProvider } from 'pages/NetworkConfiguration/data'
import {
  ProviderContainer,
  ProviderHeader,
  ProviderHeaderTitleContainer,
  ProviderSectionTitleNoMargin,
  ProviderButtonGroup,
  ProvidersGrid,
  ProviderSection,
  ProviderSectionHeader,
  ProviderFieldsContainer,
  FieldContainer,
  StyledInput,
  BulkButton,
} from 'styles/pages/NetworkConfiguration'
import { providerFields } from 'pages/NetworkConfiguration/fieldConfigs'
import { TypographyVariant } from 'enums/typography'

const ProviderBankDetails: FC<IProviderBankDetailsProps> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'providers',
  })

  const renderProviderField = (field: IFieldConfig, providerIndex: number) => {
    const fieldError = errors.providers?.[providerIndex]?.[field.name] as FieldError | undefined

    return (
      <FieldContainer key={field.name}>
        <Typography variant={TypographyVariant.Body2Medium} sx={{ mb: 1 }}>
          {field.label}
        </Typography>
        <Controller
          control={control}
          name={`providers.${providerIndex}.${field.name}` as const}
          rules={{
            required: field.required ? `${field.label} is required` : undefined,
            ...field.validation,
          }}
          render={({ field: controllerField }) => (
            <StyledInput
              placeholder={field.placeholder}
              value={controllerField.value || ''}
              onChange={controllerField.onChange}
              onBlur={controllerField.onBlur}
              name={controllerField.name}
              inputRef={controllerField.ref}
              error={!!fieldError}
              helperText={fieldError?.message}
            />
          )}
        />
      </FieldContainer>
    )
  }

  return (
    <ProviderContainer>
      <ProviderHeader>
        <ProviderHeaderTitleContainer>
          <BankIcon />
          <ProviderSectionTitleNoMargin>Provider Bank Account Details</ProviderSectionTitleNoMargin>
        </ProviderHeaderTitleContainer>
        <ProviderButtonGroup>
          <BulkButton variant="outlined" onClick={() => append(defaultProvider)}>
            <AddIcon /> Add Provider
          </BulkButton>
          <BulkButton variant="contained">Bulk upload</BulkButton>
        </ProviderButtonGroup>
      </ProviderHeader>

      <ProvidersGrid>
        {fields.map((field, index) => (
          <ProviderSection key={field.id}>
            <ProviderSectionHeader>
              <Typography variant={TypographyVariant.Body1Medium}>Provider {index + 1}</Typography>
              {fields.length > 1 && (
                <BulkButton variant="text" onClick={() => remove(index)}>
                  <RemoveIcon />
                </BulkButton>
              )}
            </ProviderSectionHeader>

            <ProviderFieldsContainer>
              {providerFields.map((fieldConfig) => renderProviderField(fieldConfig, index))}
            </ProviderFieldsContainer>
          </ProviderSection>
        ))}
      </ProvidersGrid>
    </ProviderContainer>
  )
}

export default ProviderBankDetails

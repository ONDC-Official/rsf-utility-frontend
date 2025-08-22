import { Tooltip, Typography } from '@mui/material'
import { Controller, FieldError } from 'react-hook-form'
import ToolTipIcon from 'assets/images/svg/ToolTipIcon'
import DateInput from 'components/common/DateInput'
import RequiredFieldLabel from 'components/common/RequiredFieldLabel'
import {
  DomainConfigContainer,
  SectionTitle,
  FullWidthFieldContainer,
  FieldRow,
  TaxContainer,
  TaxSection,
  ApplicabilityContainer,
  TaxFieldRow,
  FieldContainer,
  LabelWrapper,
  IconWrapper,
  StyledInput,
  StyledSelect,
} from 'styles/pages/NetworkConfiguration'
import {
  IDomainConfigurationProps,
  ITaxFieldConfig,
  ITaxSection,
  IGenericFieldConfig,
} from 'pages/NetworkConfiguration/type'
import { DOMAIN_CATEGORIES } from 'constants/domains'
import { TypographyVariant } from 'enums/typography'
import {
  basicFields,
  buyerTaxFields,
  sellerTaxFields,
  sellerProviderTaxFields,
  applicabilityFields,
} from 'pages/NetworkConfiguration/fieldConfigs'

const DomainConfiguration = ({
  control,
  errors,
  role,
  isEditing,
  type,
  selectedUser,
}: IDomainConfigurationProps): JSX.Element => {
  // Function to get dynamic tooltip text based on field and edit mode
  const getDynamicTooltipText = (field: ITaxFieldConfig | IGenericFieldConfig): string => {
    if (!field.hasTooltip) return field.tooltipText || ''

    // If not editing, return default tooltip text
    if (!isEditing || !selectedUser) {
      return field.tooltipText || ''
    }

    // Map field names to user API values
    let apiValue: number | undefined
    switch (field.name) {
      case 'buyerNpToNpTcs':
      case 'sellerNpToTcs':
        apiValue = selectedUser.np_tcs
        break
      case 'buyerNpToNpTds':
      case 'sellerNpToTds':
        apiValue = selectedUser.np_tds
        break
      case 'sellerNpToProviderTcs':
        apiValue = selectedUser.pr_tcs
        break
      case 'sellerNpToProviderTds':
        apiValue = selectedUser.pr_tds
        break
      default:
        return field.tooltipText || ''
    }

    // Show API value with % if available
    if (apiValue !== undefined && apiValue !== null) {
      return `Current value: ${apiValue}%`
    }

    return field.tooltipText || ''
  }

  const renderField = (field: ITaxFieldConfig | IGenericFieldConfig, disabled = false) => {
    const fieldError = errors[field.name as keyof typeof errors] as FieldError | undefined

    if (field.type === 'select') {
      const options = field.name === 'domainCategory' ? DOMAIN_CATEGORIES : field.options

      return (
        <FieldContainer key={field.name}>
          <RequiredFieldLabel>{field.label}</RequiredFieldLabel>
          <Controller
            control={control}
            name={field.name as any}
            rules={{
              required: field.required ? `${field.label} is required` : undefined,
              ...field.validation,
            }}
            render={({ field: controllerField }) => (
              <StyledSelect
                value={controllerField.value || ''}
                onChange={(e) => controllerField.onChange(e.target.value)}
                error={!!fieldError}
                disabled={disabled}
                displayEmpty
                renderValue={(selected: unknown) => {
                  if (!selected) return field.placeholder
                  if (field.name === 'domainCategory') {
                    const selectedOption = DOMAIN_CATEGORIES.find((opt) => opt.value === selected)
                    return selectedOption ? selectedOption.value : String(selected)
                  }

                  return String(selected)
                }}
                options={options || []}
                formControlProps={{ error: !!fieldError, fullWidth: true }}
              />
            )}
          />
          {fieldError && (
            <Typography variant={TypographyVariant.Caption1Regular} color="error">
              {fieldError.message}
            </Typography>
          )}
        </FieldContainer>
      )
    }

    if (field.type === 'date') {
      return (
        <FieldContainer key={field.name}>
          <RequiredFieldLabel>{field.label}</RequiredFieldLabel>
          <Controller
            control={control}
            name={field.name as any}
            rules={{ required: field.required ? `${field.label} is required` : undefined }}
            render={({ field: controllerField }) => (
              <DateInput
                value={String(controllerField.value || '')}
                onChange={controllerField.onChange}
                onBlur={controllerField.onBlur}
                name={controllerField.name}
                inputRef={controllerField.ref}
                error={!!fieldError}
                helperText={fieldError?.message}
                placeholder={field.placeholder}
                disabled={disabled}
              />
            )}
          />
        </FieldContainer>
      )
    }

    return (
      <FieldContainer key={field.name}>
        {field.hasTooltip ? (
          <LabelWrapper>
            <RequiredFieldLabel>{field.label}</RequiredFieldLabel>
            <Tooltip title={getDynamicTooltipText(field)} arrow placement="right-start">
              <IconWrapper>
                <ToolTipIcon />
              </IconWrapper>
            </Tooltip>
          </LabelWrapper>
        ) : (
          <RequiredFieldLabel>{field.label}</RequiredFieldLabel>
        )}
        <Controller
          control={control}
          name={field.name as any}
          rules={{
            required: field.required ? `${field.label} is required` : undefined,
            ...field.validation,
          }}
          render={({ field: controllerField }) => (
            <StyledInput
              type={field.type}
              inputProps={field.type === 'number' ? { step: 'any' } : undefined}
              placeholder={field.placeholder}
              value={controllerField.value ?? ''}
              onChange={controllerField.onChange}
              onBlur={controllerField.onBlur}
              name={controllerField.name}
              inputRef={controllerField.ref}
              error={!!fieldError}
              helperText={fieldError?.message}
              disabled={disabled}
            />
          )}
        />
      </FieldContainer>
    )
  }

  const renderTaxSection = (taxFields: ITaxSection[]) => (
    <TaxContainer>
      {taxFields.map((section) => (
        <TaxSection key={section.section}>
          {section.fields.map((field: ITaxFieldConfig) => (
            <TaxFieldRow key={field.name}>{renderField(field)}</TaxFieldRow>
          ))}
        </TaxSection>
      ))}
    </TaxContainer>
  )

  return (
    <DomainConfigContainer>
      <SectionTitle>Domain Configuration 1</SectionTitle>

      {/* Title Field - Full Width */}
      <FullWidthFieldContainer>
        {renderField({
          name: 'title',
          label: 'Title',
          type: 'input',
          required: true,
          placeholder: 'Enter title of a configuration',
        })}
      </FullWidthFieldContainer>

      {/* Basic Fields Row */}
      <FieldRow>
        {basicFields
          .filter((field) => !field.showCondition || field.showCondition(role))
          .map((field) =>
            renderField(field, isEditing && ['role', 'domainCategory', 'subscriberUrl'].includes(field.name)),
          )}
      </FieldRow>

      {/* Tax Fields based on Role */}
      {role === 'Buyer App' && renderTaxSection(buyerTaxFields)}

      {role === 'Seller App' && type !== 'MSN' && renderTaxSection(sellerTaxFields)}

      {role === 'Seller App' && type === 'MSN' && (
        <>
          {renderTaxSection(sellerTaxFields)}
          {renderTaxSection(sellerProviderTaxFields)}
        </>
      )}

      {/* Applicability Fields */}
      {(role === 'Buyer App' || role === 'Seller App') && (
        <ApplicabilityContainer>{applicabilityFields.map((field) => renderField(field))}</ApplicabilityContainer>
      )}
    </DomainConfigContainer>
  )
}

export default DomainConfiguration

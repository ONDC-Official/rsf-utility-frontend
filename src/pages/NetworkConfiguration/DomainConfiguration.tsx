import { Tooltip, Typography } from '@mui/material'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import ToolTipIcon from 'assets/images/svg/ToolTipIcon'
import {
  ConfigurationBox,
  SettlementHeader,
  NetworkIdentityHeader,
  NetworkIdentityTitle,
  DomainConfigContainer,
  ConfigHeader,
  FormContainer,
  LabelWrapper,
  IconWrapper,
  ErrorMessage,
  StyledInput,
  StyledSelect,
} from 'styles/pages/NetworkConfiguration'
import { TypographyVariant } from 'enums/typography'
import { Controller } from 'react-hook-form'
import { IDomainConfigurationProps } from 'pages/NetworkConfiguration/type'
import colors from 'theme/colors'

const regexUrl = new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$')

const DomainConfiguration = ({ control, errors, role, selectedUser }: IDomainConfigurationProps) => {
  return (
    <ConfigurationBox>
      <SettlementHeader>
        <NetworkIdentityHeader>
          <TaxesIcon />
          <NetworkIdentityTitle>Settlement Configuration</NetworkIdentityTitle>
        </NetworkIdentityHeader>
      </SettlementHeader>

      <DomainConfigContainer>
        <ConfigHeader>Domain Configuration</ConfigHeader>
        <FormContainer>
          {/* Role */}
          <div>
            <Typography variant={TypographyVariant.Body5Medium} color={colors.text.caption}>
              Role
            </Typography>
            <Controller
              control={control}
              name="role"
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <StyledSelect
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.role}
                  disabled={!!selectedUser}
                  displayEmpty
                  renderValue={(selected: unknown) => (selected ? String(selected) : 'Select Role')}
                  options={[
                    { value: 'Seller App', label: 'Seller App' },
                    { value: 'Buyer App', label: 'Buyer App' },
                  ]}
                  formControlProps={{ error: !!errors.role, fullWidth: true }}
                />
              )}
            />
            {errors.role && (
              <ErrorMessage color="error" variant="caption">
                {errors.role.message}
              </ErrorMessage>
            )}
          </div>

          {/* Domain Category */}
          <div>
            <Typography variant={TypographyVariant.Body5Medium} color={colors.text.caption}>
              Domain Category
            </Typography>
            <Controller
              control={control}
              name="domainCategory"
              rules={{ required: 'Domain category is required' }}
              render={({ field }) => (
                <StyledSelect
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.domainCategory}
                  disabled={!!selectedUser}
                  displayEmpty
                  renderValue={(selected: unknown) => (selected ? String(selected) : 'Select Domain Category')}
                  options={[{ value: 'F&B (RET11)', label: 'F&B (RET11)' }]}
                  formControlProps={{ error: !!errors.domainCategory, fullWidth: true }}
                />
              )}
            />
            {errors.domainCategory && (
              <ErrorMessage color="error" variant="caption">
                {errors.domainCategory.message}
              </ErrorMessage>
            )}
          </div>

          {/* NP to NP Tax (%) */}
          <div>
            <LabelWrapper>
              <Typography variant={TypographyVariant.Body5Medium} color={colors.text.caption}>
                NP to NP Tax (%)
              </Typography>
              <Tooltip title="Tax applicable for an Inter NP Settlement" arrow placement="right-start">
                <IconWrapper>
                  <ToolTipIcon />
                </IconWrapper>
              </Tooltip>
            </LabelWrapper>
            <Controller
              control={control}
              name="npToNpTax"
              rules={{
                required: 'Tax is required',
                min: { value: 0, message: 'Tax cannot be negative' },
                max: { value: 100, message: 'Tax cannot exceed 100%' },
              }}
              render={({ field }) => (
                <StyledInput
                  type="number"
                  inputProps={{ step: 'any' }}
                  placeholder="Enter NP to NP Tax (%)"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  inputRef={field.ref}
                  error={!!errors.npToNpTax}
                  helperText={errors.npToNpTax?.message}
                />
              )}
            />
          </div>

          {/* Subscriber URL */}
          <div>
            <Typography variant={TypographyVariant.Body5Medium} color={colors.text.caption}>
              Subscriber URL
            </Typography>
            <Controller
              control={control}
              name="subscriberUrl"
              rules={{
                required: 'URL is required',
                pattern: { value: regexUrl, message: 'Invalid URL' },
              }}
              render={({ field }) => (
                <StyledInput
                  placeholder="Enter Subscriber URL"
                  value={field.value || ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  inputRef={field.ref}
                  error={!!errors.subscriberUrl}
                  helperText={errors.subscriberUrl?.message}
                  disabled={!!selectedUser}
                />
              )}
            />
          </div>

          {/* NP to Provider Tax (%) */}
          <div>
            <LabelWrapper>
              <Typography variant={TypographyVariant.Body5Medium} color={colors.text.caption}>
                NP to Provider Tax (%)
              </Typography>
              <Tooltip title="Tax applicable for an MSN settling to their provider" arrow placement="right-start">
                <IconWrapper>
                  <ToolTipIcon />
                </IconWrapper>
              </Tooltip>
            </LabelWrapper>
            <Controller
              control={control}
              name="npToProviderTax"
              rules={{
                required: 'Tax is required',
                min: { value: 0, message: 'Tax cannot be negative' },
                max: { value: 100, message: 'Tax cannot exceed 100%' },
              }}
              render={({ field }) => (
                <StyledInput
                  type="number"
                  inputProps={{ step: 'any' }}
                  placeholder="Enter NP to Provider Tax (%)"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  inputRef={field.ref}
                  error={!!errors.npToProviderTax}
                  helperText={errors.npToProviderTax?.message}
                />
              )}
            />
          </div>

          {/* Type - Only if role ≠ 'Buyer App' */}
          {role !== 'Buyer App' && (
            <div>
              <Typography variant={TypographyVariant.Body5Medium} color={colors.text.caption}>
                Type
              </Typography>
              <Controller
                control={control}
                name="type"
                rules={{ required: 'Type is required' }}
                render={({ field }) => (
                  <StyledSelect
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.type}
                    disabled={!!selectedUser}
                    displayEmpty
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'Select Type')}
                    options={[
                      { value: '', label: 'Select Type' },
                      { value: 'MSN', label: 'MSN' },
                    ]}
                    formControlProps={{ error: !!errors.type, fullWidth: true }}
                  />
                )}
              />
              {errors.type && (
                <ErrorMessage color="error" variant="caption">
                  {errors.type.message}
                </ErrorMessage>
              )}
            </div>
          )}
        </FormContainer>
      </DomainConfigContainer>
    </ConfigurationBox>
  )
}

export default DomainConfiguration

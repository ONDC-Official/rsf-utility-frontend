import { Tooltip, Typography } from '@mui/material'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import ToolTipIcon from 'assets/images/svg/ToolTipIcon'
import {
  ConfigurationBox,
  SettlementHeader,
  NetworkIdentityHeader,
  DomainConfigContainer,
  ConfigHeader,
  FormContainer,
  LabelWrapper,
  IconWrapper,
  StyledInput,
  StyledSelect,
} from 'styles/pages/NetworkConfiguration'
import { Controller } from 'react-hook-form'
import { IDomainConfigurationProps } from 'pages/NetworkConfiguration/type'
import { DOMAIN_CATEGORIES } from 'constants/domains'
import RequiredFieldLabel from 'components/common/RequiredFieldLabel'
import { TypographyVariant } from 'enums/typography'

const regexUrl = new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$')

const typeOptions = [
  { value: 'MSN', label: 'MSN' },
  { value: 'ISN', label: 'ISN' },
]

const DomainConfiguration = ({ control, errors, role, isEditing, type }: IDomainConfigurationProps): JSX.Element => (
  <ConfigurationBox>
    <SettlementHeader>
      <NetworkIdentityHeader>
        <TaxesIcon />
        <Typography variant={TypographyVariant.H5Bold}>Settlement Configuration</Typography>
      </NetworkIdentityHeader>
    </SettlementHeader>

    <DomainConfigContainer>
      <ConfigHeader>Domain Configuration</ConfigHeader>
      <FormContainer>
        <div>
          <RequiredFieldLabel>Title</RequiredFieldLabel>
          <Controller
            control={control}
            name="title"
            rules={{
              required: 'Title is required',
            }}
            render={({ field }) => (
              <StyledInput
                placeholder="Enter configuration title"
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                inputRef={field.ref}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </div>

        <div>
          <RequiredFieldLabel>Role</RequiredFieldLabel>
          <Controller
            control={control}
            name="role"
            rules={{ required: 'Role is required' }}
            render={({ field }) => (
              <StyledSelect
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.role}
                disabled={isEditing}
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
            <Typography variant={TypographyVariant.Caption1Regular} color="error">
              {errors.role.message}
            </Typography>
          )}
        </div>

        <div>
          <RequiredFieldLabel>Domain Category</RequiredFieldLabel>
          <Controller
            control={control}
            name="domainCategory"
            rules={{ required: 'Domain category is required' }}
            render={({ field }) => (
              <StyledSelect
                value={DOMAIN_CATEGORIES?.find((d) => d?.value === field.value)?.label || ''}
                onChange={(e) => field.onChange(e.target.value)}
                error={!!errors.domainCategory}
                disabled={isEditing}
                displayEmpty
                renderValue={(selected: unknown) => {
                  if (!selected) return 'Select Domain Category'
                  const selectedOption = DOMAIN_CATEGORIES.find((opt) => opt.value === selected)
                  return selectedOption ? selectedOption.value : String(selected)
                }}
                options={DOMAIN_CATEGORIES}
                formControlProps={{ error: !!errors.domainCategory, fullWidth: true }}
              />
            )}
          />
          {errors.domainCategory && (
            <Typography variant={TypographyVariant.Caption1Regular} color="error">
              {errors.domainCategory.message}
            </Typography>
          )}
        </div>

        <div>
          <RequiredFieldLabel>Subscriber URL</RequiredFieldLabel>
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
                disabled={isEditing}
              />
            )}
          />
        </div>

        {role === 'Seller App' && (
          <div>
            <RequiredFieldLabel>Type</RequiredFieldLabel>

            <Controller
              control={control}
              name="type"
              rules={{ required: 'Type is required' }}
              render={({ field }) => {
                return (
                  <StyledSelect
                    value={typeOptions?.find((d) => d?.value === field.value)?.label || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.type}
                    disabled={isEditing}
                    displayEmpty
                    renderValue={(selected: unknown) => {
                      if (!selected) return 'Select Type'
                      const selectedOption = typeOptions.find((opt) => opt.value === selected)
                      return selectedOption ? selectedOption.value : String(selected)
                    }}
                    options={typeOptions}
                    formControlProps={{ error: !!errors.type, fullWidth: true }}
                  />
                )
              }}
            />

            {errors.type && (
              <Typography variant={TypographyVariant.Caption1Regular} color="error">
                {errors.type.message}
              </Typography>
            )}
          </div>
        )}

        {role === 'Buyer App' && (
          <>
            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to NP TCS (%)</RequiredFieldLabel>
                <Tooltip title="TCS applicable for Buyer NP to NP" arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="buyerNpToNpTcs"
                rules={{
                  required: 'NP to NP TCS is required',
                  min: { value: 0, message: 'TCS cannot be negative' },
                  max: { value: 100, message: 'TCS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to NP TCS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.buyerNpToNpTcs}
                    helperText={errors.buyerNpToNpTcs?.message}
                  />
                )}
              />
            </div>

            <div>
              <RequiredFieldLabel>TCS Applicability</RequiredFieldLabel>
              <Controller
                control={control}
                name="tcs_applicability"
                render={({ field }) => (
                  <StyledSelect
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.tcs_applicability}
                    displayEmpty
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'Select')}
                    options={[
                      { value: 'None', label: 'None' },
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'BOTH' },
                      { value: 'None', label: 'NONE' },
                    ]}
                    formControlProps={{ error: !!errors.tcs_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tcs_applicability && (
                <Typography variant={TypographyVariant.Caption1Regular} color="error">
                  {errors.tcs_applicability.message}
                </Typography>
              )}
            </div>

            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to NP TDS (%)</RequiredFieldLabel>
                <Tooltip title="TDS applicable for Buyer NP to NP" arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="buyerNpToNpTds"
                rules={{
                  required: 'NP to NP TDS is required',
                  min: { value: 0, message: 'TDS cannot be negative' },
                  max: { value: 100, message: 'TDS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to NP TDS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.buyerNpToNpTds}
                    helperText={errors.buyerNpToNpTds?.message}
                  />
                )}
              />
            </div>

            <div>
              <RequiredFieldLabel>TDS Applicability</RequiredFieldLabel>
              <Controller
                control={control}
                name="tds_applicability"
                render={({ field }) => (
                  <StyledSelect
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.tds_applicability}
                    displayEmpty
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'Select')}
                    options={[
                      { value: 'None', label: 'None' },
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'BOTH' },
                      { value: 'None', label: 'NONE' },
                    ]}
                    formControlProps={{ error: !!errors.tds_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tds_applicability && (
                <Typography variant={TypographyVariant.Caption1Regular} color="error">
                  {errors.tds_applicability.message}
                </Typography>
              )}
            </div>
          </>
        )}

        {role === 'Seller App' && type !== 'MSN' && (
          <>
            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to NP TCS (%)</RequiredFieldLabel>
                <Tooltip title="TCS applicable for Seller NP to NP (MSN false)" arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="sellerNpToTcs"
                rules={{
                  required: 'NP to NP TCS is required',
                  min: { value: 0, message: 'TCS cannot be negative' },
                  max: { value: 100, message: 'TCS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to NP TCS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.sellerNpToTcs}
                    helperText={errors.sellerNpToTcs?.message}
                  />
                )}
              />
            </div>

            <div>
              <RequiredFieldLabel>TCS Applicability</RequiredFieldLabel>
              <Controller
                control={control}
                name="tcs_applicability"
                render={({ field }) => (
                  <StyledSelect
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.tcs_applicability}
                    displayEmpty
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'Select')}
                    options={[
                      { value: 'None', label: 'None' },
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tcs_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tcs_applicability && (
                <Typography variant={TypographyVariant.Caption1Regular} color="error">
                  {errors.tcs_applicability.message}
                </Typography>
              )}
            </div>

            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to NP TDS (%)</RequiredFieldLabel>
                <Tooltip title="TDS applicable for Seller NP to NP" arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="sellerNpToTds"
                rules={{
                  required: 'NP to NP TDS is required',
                  min: { value: 0, message: 'TDS cannot be negative' },
                  max: { value: 100, message: 'TDS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to NP TDS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.sellerNpToTds}
                    helperText={errors.sellerNpToTds?.message}
                  />
                )}
              />
            </div>

            <div>
              <RequiredFieldLabel>TDS Applicability</RequiredFieldLabel>
              <Controller
                control={control}
                name="tds_applicability"
                render={({ field }) => (
                  <StyledSelect
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.tds_applicability}
                    displayEmpty
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'Select')}
                    options={[
                      { value: 'None', label: 'None' },
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tds_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tds_applicability && (
                <Typography variant={TypographyVariant.Caption1Regular} color="error">
                  {errors.tds_applicability.message}
                </Typography>
              )}
            </div>
          </>
        )}

        {role === 'Seller App' && type === 'MSN' && (
          <>
            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to NP TCS (%)</RequiredFieldLabel>
                <Tooltip title="TCS applicable for Seller NP to NP" arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="sellerNpToTcs"
                rules={{
                  required: 'NP to NP TCS is required',
                  min: { value: 0, message: 'TCS cannot be negative' },
                  max: { value: 100, message: 'TCS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to NP TCS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.sellerNpToTcs}
                    helperText={errors.sellerNpToTcs?.message}
                  />
                )}
              />
            </div>

            <div>
              <RequiredFieldLabel>TCS Applicability</RequiredFieldLabel>
              <Controller
                control={control}
                name="tcs_applicability"
                render={({ field }) => (
                  <StyledSelect
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.tcs_applicability}
                    displayEmpty
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'Select')}
                    options={[
                      { value: 'None', label: 'None' },
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tcs_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tcs_applicability && (
                <Typography variant={TypographyVariant.Caption1Regular} color="error">
                  {errors.tcs_applicability.message}
                </Typography>
              )}
            </div>

            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to NP TDS (%)</RequiredFieldLabel>
                <Tooltip title="TDS applicable for Seller NP to NP " arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="sellerNpToTds"
                rules={{
                  required: 'NP to NP TDS is required',
                  min: { value: 0, message: 'TDS cannot be negative' },
                  max: { value: 100, message: 'TDS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to NP TDS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.sellerNpToTds}
                    helperText={errors.sellerNpToTds?.message}
                  />
                )}
              />
            </div>

            <div>
              <RequiredFieldLabel>TDS Applicability</RequiredFieldLabel>
              <Controller
                control={control}
                name="tds_applicability"
                render={({ field }) => (
                  <StyledSelect
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.tds_applicability}
                    displayEmpty
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'Select')}
                    options={[
                      { value: 'None', label: 'None' },
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tds_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tds_applicability && (
                <Typography variant={TypographyVariant.Caption1Regular} color="error">
                  {errors.tds_applicability.message}
                </Typography>
              )}
            </div>

            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to Provider TCS (%)</RequiredFieldLabel>
                <Tooltip title="TCS applicable for Seller NP to Provider" arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="sellerNpToProviderTcs"
                rules={{
                  required: 'NP to Provider TCS is required',
                  min: { value: 0, message: 'TCS cannot be negative' },
                  max: { value: 100, message: 'TCS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to Provider TCS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.sellerNpToProviderTcs}
                    helperText={errors.sellerNpToProviderTcs?.message}
                  />
                )}
              />
            </div>

            <div>
              <LabelWrapper>
                <RequiredFieldLabel>NP to Provider TDS (%)</RequiredFieldLabel>
                <Tooltip title="TDS applicable for Seller NP to Provider" arrow placement="right-start">
                  <IconWrapper>
                    <ToolTipIcon />
                  </IconWrapper>
                </Tooltip>
              </LabelWrapper>
              <Controller
                control={control}
                name="sellerNpToProviderTds"
                rules={{
                  required: 'NP to Provider TDS is required',
                  min: { value: 0, message: 'TDS cannot be negative' },
                  max: { value: 100, message: 'TDS cannot exceed 100%' },
                }}
                render={({ field }) => (
                  <StyledInput
                    type="number"
                    inputProps={{ step: 'any' }}
                    placeholder="Enter NP to Provider TDS (%)"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.sellerNpToProviderTds}
                    helperText={errors.sellerNpToProviderTds?.message}
                  />
                )}
              />
            </div>
          </>
        )}
      </FormContainer>
    </DomainConfigContainer>
  </ConfigurationBox>
)

export default DomainConfiguration

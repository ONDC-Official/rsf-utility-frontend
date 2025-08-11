import { Tooltip } from '@mui/material'
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
import { Controller } from 'react-hook-form'
import { IDomainConfigurationProps } from 'pages/NetworkConfiguration/type'
import { DOMAIN_CATEGORIES } from 'constants/domains'
import RequiredFieldLabel from 'components/common/RequiredFieldLabel'

const regexUrl = new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$')

const DomainConfiguration = ({ control, errors, role, selectedUser, type }: IDomainConfigurationProps): JSX.Element => (
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
                disabled={!!selectedUser}
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
            <ErrorMessage color="error" variant="caption">
              {errors.domainCategory.message}
            </ErrorMessage>
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
                disabled={!!selectedUser}
              />
            )}
          />
        </div>

        {role !== 'Buyer App' && (
          <div>
            <RequiredFieldLabel>Type</RequiredFieldLabel>
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
                  options={[{ value: 'MSN', label: 'MSN' }]}
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
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'None')}
                    options={[
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
                <ErrorMessage color="error" variant="caption">
                  {errors.tcs_applicability.message}
                </ErrorMessage>
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
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'None')}
                    options={[
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
                <ErrorMessage color="error" variant="caption">
                  {errors.tds_applicability.message}
                </ErrorMessage>
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
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'None')}
                    options={[
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tcs_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tcs_applicability && (
                <ErrorMessage color="error" variant="caption">
                  {errors.tcs_applicability.message}
                </ErrorMessage>
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
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'None')}
                    options={[
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tds_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tds_applicability && (
                <ErrorMessage color="error" variant="caption">
                  {errors.tds_applicability.message}
                </ErrorMessage>
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
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'None')}
                    options={[
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tcs_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tcs_applicability && (
                <ErrorMessage color="error" variant="caption">
                  {errors.tcs_applicability.message}
                </ErrorMessage>
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
                    renderValue={(selected: unknown) => (selected ? String(selected) : 'None')}
                    options={[
                      { value: 'ISN', label: 'ISN' },
                      { value: 'MSN', label: 'MSN' },
                      { value: 'Both', label: 'Both' },
                    ]}
                    formControlProps={{ error: !!errors.tds_applicability, fullWidth: true }}
                  />
                )}
              />
              {errors.tds_applicability && (
                <ErrorMessage color="error" variant="caption">
                  {errors.tds_applicability.message}
                </ErrorMessage>
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

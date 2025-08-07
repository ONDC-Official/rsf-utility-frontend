import { Typography } from '@mui/material'
import { MenuItem, Select, FormHelperText, TextField } from '@mui/material'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import { TypographyVariant } from 'enums/typography'
import {
  ConfigurationBox,
  SettlementHeader,
  NetworkIdentityHeader,
  NetworkIdentityTitle,
  DomainConfigContainer,
  ConfigHeader,
  FormContainer,
} from 'styles/pages/NetworkConfiguration'
import { IDomainConfigurationProps } from 'pages/NetworkConfiguration/type'

const regexUrl = new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$')

const DomainConfiguration = ({ register, errors, role, setValue, watch }: IDomainConfigurationProps) => {
  const { domainCategory, type } = watch()

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
          <Typography variant={TypographyVariant.Body5Medium}>Title</Typography>
          <TextField
            fullWidth
            placeholder="Enter Configuration Title"
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <Typography variant={TypographyVariant.Body5Medium}>Role</Typography>
          <Select
            {...register('role', { required: 'Role is required' })}
            value={role || ''}
            onChange={(e) => setValue('role', e.target.value, { shouldValidate: true })}
            error={!!errors.role}
            displayEmpty
            renderValue={(selected) => (selected ? selected : 'Select Role')}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="Seller App">Seller App</MenuItem>
            <MenuItem value="Buyer App">Buyer App</MenuItem>
          </Select>
          {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
          <Typography variant={TypographyVariant.Body5Medium}>Domain Category</Typography>
          <Select
            {...register('domainCategory', { required: 'Domain category is required' })}
            value={domainCategory || ''}
            onChange={(e) => setValue('domainCategory', e.target.value, { shouldValidate: true })}
            error={!!errors.domainCategory}
            displayEmpty
            renderValue={(selected) => (selected ? selected : 'Select Domain Category')}
          >
            <MenuItem value="" disabled>
              Select Domain Category
            </MenuItem>
            <MenuItem value="F&B (RET11)">F&B (RET11)</MenuItem>
          </Select>
          {errors.domainCategory && <FormHelperText error>{errors.domainCategory.message}</FormHelperText>}
          <Typography variant={TypographyVariant.Body5Medium}>NP to NP Tax (%)</Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="Enter NP to NP Tax (%)"
            {...register('npToNpTax', {
              required: 'Tax is required',
              min: { value: 0, message: 'Tax cannot be negative' },
              max: { value: 100, message: 'Tax cannot exceed 100%' },
            })}
            error={!!errors.npToNpTax}
            helperText={errors.npToNpTax?.message}
          />
          <Typography variant={TypographyVariant.Body5Medium}>NP to Provider Tax (%)</Typography>
          <TextField
            fullWidth
            type="number"
            placeholder="Enter NP to Provider Tax (%)"
            {...register('npToProviderTax', {
              required: 'Tax is required',
              min: { value: 0, message: 'Tax cannot be negative' },
              max: { value: 100, message: 'Tax cannot exceed 100%' },
            })}
            error={!!errors.npToProviderTax}
            helperText={errors.npToProviderTax?.message}
          />
          {role !== 'Buyer App' && (
            <>
              <Typography variant={TypographyVariant.Body5Medium}>Type</Typography>
              <Select
                {...register('type', { required: 'Type is required' })}
                value={type || ''} // Use watched value
                onChange={(e) => setValue('type', e.target.value, { shouldValidate: true })}
                error={!!errors.type}
                displayEmpty
                renderValue={(selected) => (selected ? selected : 'Select Type')}
              >
                <MenuItem value="" disabled>
                  Select Type
                </MenuItem>
                <MenuItem value="MSN">MSN</MenuItem>
              </Select>
              {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}
              <Typography variant={TypographyVariant.Body5Medium}>Subscriber URL</Typography>
              <TextField
                fullWidth
                placeholder="Enter Subscriber URL"
                {...register('subscriberUrl', {
                  required: 'URL is required',
                  pattern: { value: regexUrl, message: 'Invalid URL' },
                })}
                error={!!errors.subscriberUrl}
                helperText={errors.subscriberUrl?.message}
              />
            </>
          )}
        </FormContainer>
      </DomainConfigContainer>
    </ConfigurationBox>
  )
}

export default DomainConfiguration

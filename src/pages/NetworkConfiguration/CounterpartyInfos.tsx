import { Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import {
  CounterpartyContainer,
  SectionTitle,
  CounterpartyFieldsContainer,
  FieldContainer,
  StyledInput,
} from 'styles/pages/NetworkConfiguration'
import { ICounterpartyInfosProps } from 'pages/NetworkConfiguration/type'
import { TypographyVariant } from 'enums/typography'
import { useToast } from 'context/toastContext'

const CounterpartyInfos = ({ control }: ICounterpartyInfosProps): JSX.Element => {
  const showToast = useToast()

  const counterpartyFieldConfig = [
    { name: 'id', label: 'ONDC Subscriber ID', disabled: true },
    { name: 'nickName', label: 'Name', disabled: false },
  ]

  return (
    <CounterpartyContainer>
      <SectionTitle>Counterparty Details</SectionTitle>

      <Controller
        control={control}
        name="counterparty_infos"
        render={({ field }) => {
          const counterpartyInfos = field.value || []

          if (!counterpartyInfos.length) {
            return <></>
          }

          return (
            <CounterpartyFieldsContainer>
              {counterpartyInfos.map((info: any, index: number) =>
                counterpartyFieldConfig.map((fieldConfig) => (
                  <FieldContainer key={`${info.id}-${index}-${fieldConfig.name}`}>
                    <Typography variant={TypographyVariant.Body2Medium} sx={{ mb: 1 }}>
                      {fieldConfig.label}
                    </Typography>
                    <StyledInput
                      value={fieldConfig.name === 'id' ? info.id || '' : info.nickName || ''}
                      disabled={fieldConfig.disabled || info?.nickName?.toLowerCase() === 'self'}
                      placeholder={fieldConfig.name === 'id' ? 'Counterparty ID' : 'Enter counterparty name'}
                      onChange={
                        fieldConfig.name === 'nickName'
                          ? (e) => {
                              const value = e.target.value

                              if (value.toLowerCase() === 'self') {
                                showToast({
                                  message: 'Cannot use "self" as counterparty name',
                                  severity: 'error',
                                })
                                return
                              }

                              const updatedInfos = [...counterpartyInfos]
                              updatedInfos[index] = { ...updatedInfos[index], nickName: value }
                              field.onChange(updatedInfos)
                            }
                          : undefined
                      }
                    />
                  </FieldContainer>
                )),
              )}
            </CounterpartyFieldsContainer>
          )
        }}
      />
    </CounterpartyContainer>
  )
}

export default CounterpartyInfos

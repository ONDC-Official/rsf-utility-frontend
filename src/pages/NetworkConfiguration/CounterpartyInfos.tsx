import { Controller } from 'react-hook-form'
import { useToast } from 'context/toastContext'
import {
  CounterpartyContainer,
  SectionTitle,
  CounterpartyFieldsContainer,
  FieldContainer,
  FieldLabel,
  StyledInput,
} from 'styles/pages/NetworkConfiguration'
import { ICounterpartyInfosProps, ICounterpartyInfo, ICounterpartyFieldConfig } from 'pages/NetworkConfiguration/type'
import { TypographyVariant } from 'enums/typography'

const CounterpartyInfos = ({ control }: ICounterpartyInfosProps): JSX.Element => {
  const showToast = useToast()

  const counterpartyFieldConfig: ICounterpartyFieldConfig[] = [
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
              {counterpartyInfos.map((info: ICounterpartyInfo, index: number) =>
                counterpartyFieldConfig.map((fieldConfig) => (
                  <FieldContainer key={`${info.id}-${index}-${fieldConfig.name}`}>
                    <FieldLabel variant={TypographyVariant.Body2Medium}>{fieldConfig.label}</FieldLabel>
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

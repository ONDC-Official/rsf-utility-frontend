import { Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import {
  ConfigurationBox,
  DomainConfigContainer,
  CounterPartyInfoFormContainer,
  StyledInput,
  SettlementHeader,
  NetworkIdentityHeader,
} from 'styles/pages/NetworkConfiguration'
import { ICounterpartyInfosProps } from 'pages/NetworkConfiguration/type'
import { TypographyVariant } from 'enums/typography'
import { useToast } from 'context/toastContext'

const CounterpartyInfos = ({ control }: ICounterpartyInfosProps): JSX.Element => {
  const showToast = useToast()

  return (
    <ConfigurationBox>
      <SettlementHeader>
        <NetworkIdentityHeader>
          <Typography variant={TypographyVariant.H5Bold}>Counterparty Details</Typography>
        </NetworkIdentityHeader>
      </SettlementHeader>

      <DomainConfigContainer>
        <CounterPartyInfoFormContainer>
          <Controller
            control={control}
            name="counterparty_infos"
            render={({ field }) => {
              const counterpartyInfos = field.value || []

              if (!counterpartyInfos.length) {
                return <></>
              }

              return (
                <>
                  {counterpartyInfos.map((info, index) => (
                    <div
                      key={`${info.id}-${index}`}
                      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}
                    >
                      <div>
                        <Typography variant={TypographyVariant.Body2Medium} style={{ marginBottom: '8px' }}>
                          ONDC Subscriber ID
                        </Typography>
                        <StyledInput value={info.id || ''} disabled={true} placeholder="Counterparty ID" />
                      </div>
                      <div>
                        <Typography variant={TypographyVariant.Body2Medium} style={{ marginBottom: '8px' }}>
                          Name
                        </Typography>
                        <StyledInput
                          disabled={info?.nickName?.toLowerCase() === 'self'}
                          value={info.nickName || ''}
                          onChange={(e) => {
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
                          }}
                          placeholder="Enter counterparty name"
                        />
                      </div>
                    </div>
                  ))}
                </>
              )
            }}
          />
        </CounterPartyInfoFormContainer>
      </DomainConfigContainer>
    </ConfigurationBox>
  )
}

export default CounterpartyInfos

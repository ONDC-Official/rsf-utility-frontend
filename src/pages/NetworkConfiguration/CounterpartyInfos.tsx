import { Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import {
  ConfigurationBox,
  DomainConfigContainer,
  ConfigHeader,
  CounterPartyInfoFormContainer,
  StyledInput,
} from 'styles/pages/NetworkConfiguration'
import { ICounterpartyInfosProps } from 'pages/NetworkConfiguration/type'
import { TypographyVariant } from 'enums/typography'

const CounterpartyInfos = ({ control }: ICounterpartyInfosProps): JSX.Element => (
  <ConfigurationBox>
    <DomainConfigContainer>
      <ConfigHeader>Counterparty Details</ConfigHeader>
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
                        value={info.nickName || ''}
                        onChange={(e) => {
                          const updatedInfos = [...counterpartyInfos]
                          updatedInfos[index] = { ...updatedInfos[index], nickName: e.target.value }
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

export default CounterpartyInfos

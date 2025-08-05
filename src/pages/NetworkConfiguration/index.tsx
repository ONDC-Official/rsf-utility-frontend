import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import NetworkIcon from '@assets/images/svg/NetworkIcon'

const Container = styled.div`
  width: 100%;
  height: 1476px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Card = styled.div`
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Heading = styled.div`
  font-family: Inter;
  font-weight: 700;
  font-style: normal;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0%;
  color: #000000;
  margin: 0;
`

const Description = styled.div`
  font-family: Inter;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0%;
  color: #757575;
  margin: 0;
`

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 20px;
  padding: 32px;
  background: #ffffff;
  box-shadow: 6px 6px 54px 0px #0000000d;
  opacity: 1;
`

const NetworkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  display: flex;
  flex-direction: row;
`

const NetworkTitle = styled.div`
  font-family: Inter;
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0%;
  color: #000000;
  background: #ffffff;
`

const SubscribeIdContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NetworkConfiguration: React.FC = () => {
  return (
    <Container>
      <Card>
        <Heading>Network Configuration</Heading>
        <Description>Configure your ONDC network parameters and settlement details</Description>
      </Card>
      <StyledBox>
        <NetworkContainer>
          <NetworkIcon />
          <NetworkTitle>Network Identity</NetworkTitle>
        </NetworkContainer>
        <SubscribeIdContainer>
          <div>Subscriber ID</div>
          <TextField id="outlined-basic" variant="outlined" placeholder="Enter your subscriber ID" />
        </SubscribeIdContainer>
      </StyledBox>
      <StyledBox>
        <NetworkContainer>
          <NetworkIcon />
          <NetworkTitle>Network Identity</NetworkTitle>
        </NetworkContainer>
        <SubscribeIdContainer>
          <div>Subscriber ID</div>
          <TextField id="outlined-basic" variant="outlined" placeholder="Enter your subscriber ID" />
        </SubscribeIdContainer>
      </StyledBox>
    </Container>
  )
}

export default NetworkConfiguration

import { FC } from 'react'
import { IHeaderSectionProps } from 'pages/NetworkConfiguration/type'
import { defaultFormData } from 'pages/NetworkConfiguration/data'
import AddIcon from 'assets/images/svg/AddIcon'
import {
  HeaderSection as HeaderSectionStyled,
  HeaderCard,
  SectionTitle,
  ActionButton,
} from 'styles/pages/NetworkConfiguration'

const HeaderSection: FC<IHeaderSectionProps> = ({ reset, setSelectedUser }) => (
  <HeaderSectionStyled>
    <HeaderCard>
      <SectionTitle>Network Configuration</SectionTitle>
    </HeaderCard>
    <ActionButton
      variant="outlined"
      onClick={() => {
        reset(defaultFormData)
        setSelectedUser(null)
      }}
    >
      <AddIcon /> Add Configuration
    </ActionButton>
  </HeaderSectionStyled>
)

export default HeaderSection

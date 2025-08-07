import AddIcon from 'assets/images/svg/AddIcon'
import { IHeaderSectionProps } from 'pages/NetworkConfiguration/type'
import { defaultFormData } from './data'
import {
  HeaderSection as HeaderSectionStyled,
  HeaderCard,
  SectionTitle,
  ActionButton,
} from 'styles/pages/NetworkConfiguration'

const HeaderSection = ({ reset, setSelectedUser }: IHeaderSectionProps) => {
  return (
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
}

export default HeaderSection

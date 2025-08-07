import { UseFormReset } from 'react-hook-form'
import AddIcon from 'assets/images/svg/AddIcon'
import { IFormData } from './type'
import { defaultFormData } from './data'
import {
  HeaderSection as HeaderSectionStyled,
  HeaderCard,
  SectionTitle,
  ActionButton,
} from 'styles/pages/NetworkConfiguration'

interface HeaderSectionProps {
  reset: UseFormReset<IFormData>
  setSelectedUser: (user: any) => void
}

const HeaderSection = ({ reset, setSelectedUser }: HeaderSectionProps) => {
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

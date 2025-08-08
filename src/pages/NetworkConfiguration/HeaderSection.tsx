import React, { memo, useCallback } from 'react'
import AddIcon from 'assets/images/svg/AddIcon'
import { IHeaderSectionProps } from 'pages/NetworkConfiguration/type'
import { defaultFormData } from 'pages/NetworkConfiguration/data'
import {
  HeaderSection as HeaderSectionStyled,
  HeaderCard,
  SectionTitle,
  ActionButton,
} from 'styles/pages/NetworkConfiguration'

const HeaderSection: React.FC<IHeaderSectionProps> = ({ reset, setSelectedUser, selectedUser }) => {
  const handleAddConfiguration = useCallback(() => {
    reset(defaultFormData)
    setSelectedUser(null)
  }, [reset, setSelectedUser])

  return (
    <HeaderSectionStyled>
      <HeaderCard>
        <SectionTitle>Network Configuration</SectionTitle>
      </HeaderCard>

      {selectedUser && (
        <ActionButton variant="outlined" onClick={handleAddConfiguration} aria-label="Add configuration">
          <AddIcon /> Add Configuration
        </ActionButton>
      )}
    </HeaderSectionStyled>
  )
}

export default memo(HeaderSection)

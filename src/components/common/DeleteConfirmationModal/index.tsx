import { FC } from 'react'
import { Modal, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import Button from 'components/common/Button'
import { DeleteConfirmationModalProps } from 'components/common/DeleteConfirmationModal/types'
import {
  ModalContainer,
  Content,
  Header,
  ModalTitle,
  CloseButton,
  StyledForm,
  ButtonContainer,
} from 'styles/components/DeleteConfirmationModal'

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) => (
  <Modal open={open} onClose={onClose}>
    <ModalContainer>
      <Content>
        <Header>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </Header>
        <StyledForm>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {message}
          </Typography>
          <ButtonContainer>
            <Button variant="outlined" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant="contained" color="error" onClick={onConfirm}>
              {confirmText}
            </Button>
          </ButtonContainer>
        </StyledForm>
      </Content>
    </ModalContainer>
  </Modal>
)

export default DeleteConfirmationModal

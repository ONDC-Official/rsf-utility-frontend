import { FC } from 'react'
import { Box, CircularProgress, Backdrop } from '@mui/material'

interface LoaderProps {
  open: boolean
  size?: number
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
}

const Loader: FC<LoaderProps> = ({ open, size = 60, color = 'primary' }) => (
  <Backdrop
    sx={{
      color: '#fff',
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    }}
    open={open}
  >
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" width="100%">
      <CircularProgress size={size} color={color} thickness={4} />
    </Box>
  </Backdrop>
)

export default Loader

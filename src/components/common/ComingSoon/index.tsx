import React from 'react'
import { Box, Typography } from '@mui/material'
import { Construction } from '@mui/icons-material'

interface ComingSoonProps {
  title?: string
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title = 'Coming Soon' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="400px"
      textAlign="center"
      gap={3}
    >
      <Construction sx={{ fontSize: 80, color: 'text.secondary' }} />
      <Typography variant="h4" color="text.primary" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={400}>
        This feature is under development and will be available soon.
      </Typography>
    </Box>
  )
}

export default ComingSoon
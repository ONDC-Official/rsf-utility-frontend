import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Construction } from '@mui/icons-material'
import { IComingSoonProps } from 'components/common/ComingSoon/types'

const ComingSoon: FC<IComingSoonProps> = ({ title = 'Coming Soon' }) => (
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

export default ComingSoon

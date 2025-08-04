import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Tabs,
  Tab,
} from '@mui/material'
import { Download, FilterList } from '@mui/icons-material'
import {
  ReconciliationContainer,
  HeaderSection,
  TabContainer,
  TabButton,
  GenerateButton,
  TableSection,
  TableHeader,
  TableTitle,
  TableControls,
  ExportButton,
  FilterButton,
  PaginationContainer,
  EntriesContainer,
  StatusChip,
  ActionButton,
} from '@styles/pages/Reconciliation.styled'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reconciliation-tabpanel-${index}`}
      aria-labelledby={`reconciliation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const Reconciliation: React.FC = () => {
  const [tabValue, setTabValue] = useState(0)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleRowSelect = (orderId: string) => {
    setSelectedRows(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    if (selectedRows.length === 5) {
      setSelectedRows([])
    } else {
      setSelectedRows(['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005'])
    }
  }

  const reconciliationData = [
    {
      orderId: 'ORD001',
      collectorId: 'COLL001',
      totalValue: '₹1500.00',
      settlementAmount: '₹1173.00',
      commission: '₹150.00',
      orderStatus: 'Not Settled',
      error: 'Settlement AP Timeout',
    },
    {
      orderId: 'ORD002',
      collectorId: 'COLL001',
      totalValue: '₹1500.00',
      settlementAmount: '₹1173.00',
      commission: '₹150.00',
      orderStatus: 'Not Settled',
      error: 'Invalid Bank Details',
    },
    {
      orderId: 'ORD003',
      collectorId: 'COLL001',
      totalValue: '₹1500.00',
      settlementAmount: '₹1173.00',
      commission: '₹150.00',
      orderStatus: 'Not Settled',
      error: 'Settlement AP Timeout',
    },
    {
      orderId: 'ORD004',
      collectorId: 'COLL001',
      totalValue: '₹1500.00',
      settlementAmount: '₹1173.00',
      commission: '₹150.00',
      orderStatus: 'Not Settled',
      error: 'Insufficient balance',
    },
    {
      orderId: 'ORD005',
      collectorId: 'COLL001',
      totalValue: '₹1500.00',
      settlementAmount: '₹1173.00',
      commission: '₹150.00',
      orderStatus: 'Not Settled',
      error: 'Settlement AP Timeout',
    },
  ]

  const outgoingRequestsData = [
    {
      orderId: 'ORD001',
      receiverId: 'RECV001',
      status: 'Accepted',
      dueDate: '2024-01-20',
      response: 'Accepted with revised due date',
      actions: ['Move to Ready'],
      error: '',
    },
    {
      orderId: 'ORD002',
      receiverId: 'RECV001',
      status: 'Rejected',
      dueDate: '2024-01-20',
      response: 'Accepted with revised due date',
      actions: ['Reinitiate', 'IGM Complaint'],
      error: 'IGM Complaint',
    },
    {
      orderId: 'ORD003',
      receiverId: 'RECV001',
      status: 'Accepted',
      dueDate: '2024-01-20',
      response: 'Accepted with revised due date',
      actions: ['Move to Ready'],
      error: '',
    },
    {
      orderId: 'ORD004',
      receiverId: 'RECV001',
      status: 'Rejected',
      dueDate: '2024-01-20',
      response: 'Accepted with revised due date',
      actions: ['Reinitiate', 'IGM Complaint'],
      error: 'IGM Complaint',
    },
    {
      orderId: 'ORD005',
      receiverId: 'RECV001',
      status: 'Accepted',
      dueDate: '2024-01-20',
      response: 'Accepted with revised due date',
      actions: ['Move to Ready'],
      error: '',
    },
  ]

  return (
    <ReconciliationContainer>
      <HeaderSection>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Reconciliation Manager
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage reconciliation requests for not settled orders.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TabContainer>
            <TabButton
              variant={tabValue === 0 ? 'contained' : 'outlined'}
              onClick={() => setTabValue(0)}
            >
              Generate Recon Request
            </TabButton>
            <TabButton
              variant={tabValue === 1 ? 'contained' : 'outlined'}
              onClick={() => setTabValue(1)}
            >
              Review Recon Requests
            </TabButton>
          </TabContainer>
          <GenerateButton variant="contained" color="primary">
            + Generate Recon Request
          </GenerateButton>
        </Box>
      </HeaderSection>

      <TabPanel value={tabValue} index={0}>
        <TableSection>
          <TableHeader>
            <TableTitle>RECV001</TableTitle>
            <TableControls>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Receiver ID</InputLabel>
                <Select value="RECV001" label="Receiver ID">
                  <MenuItem value="RECV001">RECV001</MenuItem>
                </Select>
              </FormControl>
              <ExportButton variant="outlined" startIcon={<Download />}>
                Export
              </ExportButton>
            </TableControls>
          </TableHeader>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.length === 5}
                      indeterminate={selectedRows.length > 0 && selectedRows.length < 5}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Collector ID</TableCell>
                  <TableCell>Total Value</TableCell>
                  <TableCell>Settlement Amount</TableCell>
                  <TableCell>Commission</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Error</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reconciliationData.map((row) => (
                  <TableRow key={row.orderId}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row.orderId)}
                        onChange={() => handleRowSelect(row.orderId)}
                      />
                    </TableCell>
                    <TableCell>{row.orderId}</TableCell>
                    <TableCell>{row.collectorId}</TableCell>
                    <TableCell>{row.totalValue}</TableCell>
                    <TableCell>{row.settlementAmount}</TableCell>
                    <TableCell>{row.commission}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={row.orderStatus}
                        color="error"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.error}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <PaginationContainer>
            <Typography variant="body2">
              Showing 1 to 10 of 258 entries
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Pagination count={17} page={1} size="small" />
              <EntriesContainer>
                <Typography variant="body2">Show</Typography>
                <FormControl size="small" sx={{ minWidth: 60 }}>
                  <Select value="05">
                    <MenuItem value="05">05</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2">entries</Typography>
              </EntriesContainer>
            </Box>
          </PaginationContainer>
        </TableSection>

        <TableSection sx={{ mt: 4 }}>
          <TableHeader>
            <TableTitle>Outgoing Reconciliation Requests</TableTitle>
            <TableControls>
              <FilterButton variant="outlined" startIcon={<FilterList />}>
                Filter by date
              </FilterButton>
              <ExportButton variant="outlined" startIcon={<Download />}>
                Export
              </ExportButton>
            </TableControls>
          </TableHeader>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Receiver ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Response</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell>Error</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outgoingRequestsData.map((row) => (
                  <TableRow key={row.orderId}>
                    <TableCell>{row.orderId}</TableCell>
                    <TableCell>{row.receiverId}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={row.status}
                        color={row.status === 'Accepted' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell>{row.response}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {row.actions.map((action, index) => (
                          <ActionButton
                            key={index}
                            variant="outlined"
                            size="small"
                            color={action === 'Move to Ready' ? 'primary' : 'secondary'}
                          >
                            {action === 'Move to Ready' ? '→ Move to Ready' : action}
                          </ActionButton>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>{row.error}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <PaginationContainer>
            <Typography variant="body2">
              Showing 1 to 10 of 258 entries
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Pagination count={17} page={1} size="small" />
              <EntriesContainer>
                <Typography variant="body2">Show</Typography>
                <FormControl size="small" sx={{ minWidth: 60 }}>
                  <Select value="05">
                    <MenuItem value="05">05</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2">entries</Typography>
              </EntriesContainer>
            </Box>
          </PaginationContainer>
        </TableSection>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography>Review Recon Requests content will go here</Typography>
      </TabPanel>
    </ReconciliationContainer>
  )
}

export default Reconciliation 
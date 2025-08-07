import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from 'theme/index'
import AppRoutes from 'routes/AppRoutes'
import { UserProvider } from 'context/userContext'
import { ToastProvider } from 'context/toastContext'
import { LoaderProvider } from 'context/loaderContext'

const queryClient = new QueryClient()

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <LoaderProvider>
            <UserProvider>
              <AppRoutes />
            </UserProvider>
          </LoaderProvider>
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProvider>
)

export default App

import { FC, createContext, useContext, useMemo, useState, useCallback } from 'react'
import Loader from 'components/common/Loader'

interface LoaderContextType {
  showLoader: () => void
  hideLoader: () => void
  isLoading: boolean
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const LoaderProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // Reference-counted loader to avoid race conditions between multiple show/hide calls
  const [activeRequests, setActiveRequests] = useState(0)

  const showLoader = useCallback((): void => {
    setActiveRequests((previous) => previous + 1)
  }, [])
  const hideLoader = useCallback((): void => {
    setActiveRequests((previous) => {
      if (previous <= 0) return 0
      return previous - 1
    })
  }, [])

  const isLoading = useMemo(() => activeRequests > 0, [activeRequests])

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
      <Loader open={isLoading} />
    </LoaderContext.Provider>
  )
}

export const useLoader = (): LoaderContextType => {
  const ctx = useContext(LoaderContext)
  if (!ctx) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }

  return ctx
}

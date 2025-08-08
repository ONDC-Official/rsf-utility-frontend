import { FC, createContext, useContext, useState } from 'react'
import Loader from 'components/common/Loader'

interface LoaderContextType {
  showLoader: () => void
  hideLoader: () => void
  isLoading: boolean
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export const LoaderProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const showLoader = () => setIsLoading(true)
  const hideLoader = () => setIsLoading(false)

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
      <Loader open={isLoading} />
    </LoaderContext.Provider>
  )
}

export const useLoader = () => {
  const ctx = useContext(LoaderContext)
  if (!ctx) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }

  return ctx
}

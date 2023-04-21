import '@/styles/globals.css'
import theme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import "../styles/fonts.css"
import store from '@/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} >
      <Provider store={store} >
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeContext, ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from './components/theme'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initiaColorMode}></ColorModeScript>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)


